const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/product-routes');
const cors = require('cors');


const PORT = 3004;
const URL = 'mongodb://127.0.0.1:27017/confectioneryDB';

const app = express();



app.use(express.static('backend'));
app.use('/pictures',express.static('pictures'))

app.use(cors())
app.use(express.json())
app.use(productRouter)

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

    console.log('Server started')
})