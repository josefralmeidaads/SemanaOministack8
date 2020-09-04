const Booking = require('../models/Booking');

module.exports = {
    async store(request, response){
        const { user_id } = request.headers;
        const { spot_id } = request.params;
        const { date } = request.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        return response.status(200).json(booking);
    }
};