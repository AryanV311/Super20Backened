import 'dotenv/config'
import express from "express";
import {connectDb} from "./config/db.js"
import cors from "cors";
import foodRouter from './router/foodRoute.js';
import userRouter from './router/userRoute.js';
import cartRouter from './router/cartRoute.js';
import deliverRouter from './router/deliveryRoute.js';
import orderRouter from './router/orderRoute.js';
import bodyParser from 'body-parser';
// import orderRouter from './router/orderRoute.js';

const app = express();
const PORT = 4000;
const corsOptions = {
    origin: "https://stirring-sorbet-2b260e.netlify.app",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credential: true,
}
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/food', foodRouter)
app.use('/api/user',userRouter)
app.use('/images',express.static('uploads'))
app.use("/api/cart",cartRouter)
app.use('/api/orders', orderRouter);
app.use('/api/delivery-slots',deliverRouter);

connectDb().then( () => {
    app.listen(PORT, () => {
        console.log(`server running at ${PORT}`);
    })
})
