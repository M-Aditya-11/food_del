import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://adityamandavkar1:ABrVYwFB0SuEwxJ5@cluster1.z5guw.mongodb.net/food_del').then(()=>console.log("DB Connected"));
}