const express = require('express');

const app = express();

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello everyone')
});

app.listen(5000, (err) => {
    if(err){
        return console.log(err)
    }

    console.log('Server started')
})