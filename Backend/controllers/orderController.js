// filepath: c:\Users\Aditya Mandavkar\Projects\food_del\Backend\controllers\orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const items = req.body.items.map((item) => ({
      name: item.name,
      sku: item._id,
      price: item.price.toFixed(2),
      currency: "USD",
      quantity: item.quantity,
    }));

    const deliveryCharge = 2.00.toFixed(2);
    items.push({
      name: "Delivery Charges",
      sku: "delivery",
      price: deliveryCharge,
      currency: "USD",
      quantity: 1,
    });

    const totalAmount = items
      .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);

    console.log("Items:", JSON.stringify(items, null, 2));
    console.log("Total Amount:", totalAmount);

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      },
      transactions: [
        {
          item_list: { items },
          amount: { currency: "USD", total: totalAmount },
          description: "Food order payment",
        },
      ],
    };

    console.log("Create Payment JSON:", JSON.stringify(create_payment_json, null, 2));

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("PayPal Payment Creation Error:", JSON.stringify(error.response, null, 2));
        res.json({ success: false, message: "Error creating PayPal payment", error: error.response });
      } else {
        const approvalUrl = payment.links.find((link) => link.rel === "approval_url")?.href;
        if (approvalUrl) {
          res.json({ success: true, session_url: approvalUrl });
        } else {
          console.error("No approval URL found in PayPal response:", JSON.stringify(payment, null, 2));
          res.json({ success: false, message: "No approval URL found" });
        }
      }
    });
  } catch (error) {
    console.error("Order Placement Error:", error);
    res.json({ success: false, message: "Error placing order", error: error.message });
  }
};

export { placeOrder };