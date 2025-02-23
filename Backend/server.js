import express from "express"
import cors from "cors"

// App Config

const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res,send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})