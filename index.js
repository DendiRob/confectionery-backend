const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product-routes');
const vacancyRouter = require('./routes/vacancy-routes');
const mailRouter = require('./routes/mail-routes')
const cors = require('cors');
require('dotenv').config();



const PORT = 3004;
const URL = process.env.MONGODB_URI;

const app = express();

app.use(express.static('backend'));
app.use('/pictures',express.static('pictures'))

app.use(cors());
app.use(express.json());
app.use(productRouter);
app.use(vacancyRouter);
app.use(mailRouter);


mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))


app.get('/', (req,res) => {
    res.send('Hello everyone! This is main page of the confect.. back')
});

app.listen(PORT, (err) => {
    if(err){
        return console.log(`Something went wrong while server was starting. Error ${err}`)
    }

    console.log(`Server started prot-${PORT}`)
})