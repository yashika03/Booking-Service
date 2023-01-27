const {Booking} = require('../models/index');
const {StatusCodes} = require('http-status-codes');
const {AppError, ValidationError} = require('../utils/errors/index');


class BookingRepository {
    async create(data)
    {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name=='Sequelize Validation Error')
            {
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository Error', 
                'Cannot create Booking', 
                'There is some issue in creating the booking please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BookingRepository;