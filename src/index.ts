import express  from "express";
import mongoose from "mongoose";
import productRouter from './routes/product-routes.js';
import vacancyRouter from './routes/vacancy-routes.js';
import cors from 'cors';
import 'dotenv/config';



const PORT = 3004;
const url = process.env.MONGODB_URI as string;

const app = express();



app.use(express.static('backend'));
app.use('/pictures',express.static('pictures'))

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(vacancyRouter);


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