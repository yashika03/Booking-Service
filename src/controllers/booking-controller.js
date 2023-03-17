const {StatusCodes} = require('http-status-codes');
const BookingService = require('../services/booking-service');


const { createChannel, publishMessage } = require('../utils/MessageQueue');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig');
const bookingService = new BookingService();

class BookingController {
    constructor(){
        // this.channel = channel;
    }

    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = {mesage: 'SUCCESS'};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Successfully published the event'
        });
    }
    async create (req, res){
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
}

module.exports = BookingController