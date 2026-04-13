const User = require("../models/user");
const Service = require("../models/service");
const Booking = require("../models/booking");

exports.book_service = async (req, res) => {
  try {
    const { address, bookingDate, slot } = req.body;
    const serviceId = req.params.id;
    const serviceData = await Service.findById(serviceId);

    if (!serviceData) {
      return res.status(404).json({
        success: false,
        msg: "Service not found!",
      });
    }

    const newBooking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      provider: serviceData.provider,
      bookingDate: bookingDate,
      slot: slot,
      address: address,
    });

    res.status(201).json({
      success: true,
      msg: "Booking successfully created!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error.msg);
    res.status(500).json({
      success: false,
      msg: "Server Error: Booking failed",
      error: error.msg,
    });
  }
};

exports.get_mybooking = async (req, res) => {
  const myBooking = await Booking.find({user: req.user.id}).populate("service").populate("provider");
  res.json(myBooking)
};

exports.getBooking_ById = async (req, res) => {
  const myBooking = await Booking.findById(req.params.id);
  res.json(myBooking)
};

// exports.update_status = async (req, res) => {
//     console.log(req.body)
//     const updated = await Booking.findByIdAndUpdate(req.params.id,req.body,{new: true})
//     res.json(updated);
// };


// Get all bookings for a specific Provider
exports.getProviderRequests = async (req, res) => {
  try {
    // req.user.id comes from your auth middleware
    const bookings = await Booking.find({ provider: req.user.id })
      .populate('user', 'name email profileImage phone') // Get customer details
      .populate('service', 'title category price')     // Get service details
      .sort({ createdAt: -1 });                         // Latest first

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching bookings", error: error.message });
  }
};

// Update Booking Status (Accept/Decline/Complete)
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ msg: "Update failed" });
  }
};