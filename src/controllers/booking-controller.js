const {StatusCodes} = require('http-status-codes');
const BookingService = require('../services/booking-service');
const bookingService = new BookingService();


const create = async(req,res) => {
    try {
        console.log(req.body);
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            err: {},
            message: 'Successfully completed booking',
            success: true
        })
    } catch (error) {
        return res.status(error.statusCode).json(
            {
                message: error.message,
                data: {},
                explanation: error.explanation,
                success: false
            }
        )
    }
}


module.exports = {
    create
}