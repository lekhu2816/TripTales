import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoute from './routes/auth.routes.js';


const app=express();
const corsOption={
    origin:"*",
    credentials:true
}

// ---------------------------Database connection------------------------------//

connectDB();

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());


// -------------------------API Endpoints--------------------------------------//

app.use('/api/auth',authRoute);

app.get('/',(req,res)=>{
res.send("Hello from TripTales")
})

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})