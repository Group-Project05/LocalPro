require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(["1.1.1.1","8.8.8.8"]);

const auth = require('./routers/authRouter');
const provider = require('./routers/providerRouter');
const user = require('./routers/userRouter');
const service = require('./routers/serviceRouter');
const booking = require('./routers/bookingRouter');
const review = require('./routers/reviewRouter');

const app = express();

// PORT ko dynamic set karein
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        "https://local-pro-one.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use(auth);
app.use("/provider", provider);
app.use('/user', user);
app.use('/service', service);
app.use('/booking', booking);
app.use('/review', review);

const url = process.env.MONGO_URI;;

mongoose.connect(url).then(() => {
    console.log("Mongoose Connected");
    // Render ke liye 0.0.0.0 aur dynamic PORT zaroori hai
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server started at port ${PORT}`);
    });
}).catch(err => console.error('MongoDB connection error:', err));