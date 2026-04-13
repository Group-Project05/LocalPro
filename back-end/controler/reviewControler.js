const User = require('../models/user');
const Service = require('../models/service');
const Review = require('../models/review');
const Booking = require('../models/booking')

exports.add_review = async(req,res,next)=>{
    try {
        const { booking, service, provider, rating, comment } = req.body;
        const userId = req.user.id; 
        const bookingData = await Booking.findById(booking);
        if (!bookingData || bookingData.status !== 'completed') {
            return res.status(400).json({ 
                success: false, 
                msg: "You can only review completed bookings." 
            });
        }
        const newReview = await Review.create({
            user: userId,
            booking,
            service,
            provider,
            rating,
            comment
        });

        res.status(201).json({
            success: true,
            msg: "Review added successfully!",
            data: newReview
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                msg: "You have already reviewed this service." 
            });
        }
        console.error("Review Error:", error);
        res.status(500).json({ 
            success: false, 
            msg: "Internal Server Error" 
        });
    }
}


exports.fetch_reviewByProviderId = async(req,res,next)=>{
    try {
        const reviews = await Review.find({ provider: req.params.id })
            .populate('user', 'name')
            .sort({ createdAt: -1 }); 

        if (!reviews) {
            return res.status(404).json({ success: false, msg: "No reviews found" });
        }
        // console.log("Reviews Found:", reviews.length);
        res.status(200).json(reviews);

    } catch (error) {
        console.error("Review Fetch Error:", error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}

exports.fetch_reviewByServiceId = async(req,res,next)=>{
    try {
        const reviews = await Review.find({ service: req.params.id })
            .populate('user', 'name')
            .sort({ createdAt: -1 }); 

        if (!reviews) {
            return res.status(404).json({ success: false, msg: "No reviews found" });
        }
        // console.log("Reviews Found:", reviews.length);
        res.status(200).json(reviews);

    } catch (error) {
        console.error("Review Fetch Error:", error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}