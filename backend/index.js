const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./db/db')

const authRouter = require('./routes/authrouter')
const productRouter = require('./routes/productRouter')

const PORT = process.env.PORT || 8080

app.get('/ping', (req,res) => {
    res.send("PONG")
})

app.use(bodyParser.json())
app.use(express.json())

app.use(cors({
    origin: '*',                                    // Allow requests from this origin
    credentials: true                               // If you need to send cookies with the request
}));                                                // allow requests from clients from anywhere and anyone, also in cors you can specify IPs you want to get requests from

app.use('/auth', authRouter)
app.use('/products', productRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})