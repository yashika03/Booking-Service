const BookingRepository = require('../repository/booking-repository');
const {FLIGHT_AND_SEARCH_SERVICE_PATH} = require('../config/serverConfig');
const axios = require('axios');
const ServiceError = require('../utils/errors/service-error');

class BookingService {
    constructor()
    {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data)
    {
        try {
            const flightId = data.flightId;
            const flightandsearchrequesturl = `${FLIGHT_AND_SEARCH_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(flightandsearchrequesturl);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats>flightData.totalSeats)
            {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');
            }
            const totalCost = data.noOfSeats * priceOfTheFlight;
            const bookingPayload = {...data,totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const flightandsearchupdateurl = `${FLIGHT_AND_SEARCH_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(flightandsearchupdateurl,{totalSeats: flightData.totalSeats - data.noOfSeats});
            const updatedBooking = await this.bookingRepository.update(booking.id,{status: "Booked"});
            return updatedBooking;
        } catch (error) {
            if(error.name == 'Repository Error' || error.name=='Validation Error')
            {
                throw error;
            }
            throw new ServiceError();
        }

    }

}
module.exports = BookingService;