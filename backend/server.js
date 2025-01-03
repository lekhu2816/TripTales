import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoute from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoute from './routes/post.routes.js';
import messageRouter from './routes/message.routes.js';
import AIRouter from './routes/ai.routes.js';
import { app, server } from './socket/socket.js';

const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}

// ---------------------------Database connection------------------------------//

connectDB();

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());


// -------------------------API Endpoints--------------------------------------//

app.use('/api/auth',authRoute);
app.use('/api/user',userRoutes)
app.use('/api/post',postRoute)
app.use('/api/message',messageRouter)
app.use('/api/ai',AIRouter)


app.get('/',(req,res)=>{
res.send("Hello from TripTales")
})

const PORT=process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})