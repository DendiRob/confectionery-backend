const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product-routes');

const PORT = 3004;
const URL = 'mongodb://localhost:27017/confectioneryDB';


const app = express();


app.use(express.static('backend'));
app.use('/pictures',express.static('pictures'))

app.use(express.json())
app.use(productRouter)

mongoose
    .connect(URL)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))


app.get('/', (req,res) => {
    res.send('Hello everyone! This is main page of the confect.. back')
});

app.listen(PORT, (err) => {
    if(err){
        return console.log(`Something went wrong while server was starting. Error ${err}`)
    }

    console.log('Server started')
})