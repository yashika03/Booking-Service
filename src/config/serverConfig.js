const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHT_AND_SEARCH_SERVICE_PATH: process.env.FLIGHT_AND_SEARCH_SERVICE_PATH
}