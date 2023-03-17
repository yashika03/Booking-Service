const express = require('express');
const router = express.Router();

// const {createChannel} = require('../../utils/MessageQueue');

// const channel = createChannel();
const BookingController = require('../../controllers/booking-controller');
const bookingController = new BookingController();


router.post('/bookings',bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue);

module.exports = router;