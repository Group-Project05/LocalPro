const express = require('express');
const {book_service,get_mybooking,updateBookingStatus,getBooking_ById,getProviderRequests} = require('../controler/bookingControler')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/create/:id',protect,book_service);
router.get('/fetch',protect,get_mybooking);
router.get('/detail/:id',protect,getBooking_ById);
router.put('/status/:id',protect,updateBookingStatus);
router.get('/request',protect,getProviderRequests);



module.exports = router;