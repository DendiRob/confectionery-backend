import express  from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import productRouter from './routes/product-routes.js';
import vacancyRouter from './routes/vacancy-routes.js';
import userRouter from './routes/user-routes.js'
import errorMeddleware from "./middlewares/error-meddleware.js";


const PORT = 3004;
const url = process.env.MONGODB_URI as string;

const app = express();



app.use(express.static('backend'));
app.use('/pictures',express.static('pictures'))

app.use(cors({
  credentials:true,
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());

app.use(productRouter);
app.use(vacancyRouter);
app.use(userRouter);
app.use(errorMeddleware);


mongoose
    .connect(url)
    .then(() => console.log('Connected to DB'))
    .catch((err: unknown) =>{
        if(typeof err === "string"){
            console.log(err)
        }
        if(err instanceof Error){
            console.log(err.message)
        }
    })


app.get('/', (req: express.Request , res: express.Response ) => {
    res.send('Hello everyone! This is main page of the confect.. back')
});
app.listen(PORT, (err?: unknown) => {
    if (err) {
        if (typeof err === "string") {
          return console.log(`Something went wrong while the server was starting. Error: ${err}`);
        }
        if (err instanceof Error) {
          console.error(err.message);
        }
      } else {
        console.log(`Server started on port ${PORT}`);
      }
})