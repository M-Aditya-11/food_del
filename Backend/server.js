import express from "express"
import cors from "cors"
import helmet from "helmet"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"

// App Configuration

const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

// Set Content Security Policy (CSP) headers using helmet
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://*.paypal.com", "https://*.paypalobjects.com"],
        frameSrc: ["'self'", "https://*.paypal.com"],
        imgSrc: ["'self'", "data:", "https://*.paypal.com", "https://*.paypalobjects.com"],
      },
    })
  );

// DB Connection

connectDB();

// API endpoints

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})