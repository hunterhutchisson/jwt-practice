const express = require('express');
const app = express()

const PORT = 3001

//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//hook up routes
app.use(require('./routes/authentication'));

let server = app.listen(PORT,() => {
    console.log(`Listening on ${PORT}`);
})  