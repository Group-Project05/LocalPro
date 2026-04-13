
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns =  require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"]);

const auth = require('./routers/authRouter');
const provider = require('./routers/providerRouter');
const user = require('./routers/userRouter');
const service = require('./routers/serviceRouter');
const booking = require('./routers/bookingRouter');
const review = require('./routers/reviewRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(auth);
app.use("/provider",provider);
app.use('/user',user);
app.use('/service',service);
app.use('/booking',booking);
app.use('/review',review);

const url = "mongodb+srv://Sahil:Sahilydv0214@sahil.ix9wnlh.mongodb.net/SmartService?appName=Sahil";

mongoose.connect(url).then(()=>{
    console.log("Mongoose Connected");
    app.listen(3000, ()=> console.log('server start at http://localhost:3000'));
}).catch(err => console.error('MongoDB connection error:', err));