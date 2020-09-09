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

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = request.connectedUsers[booking.spot.user]; // pegando id dos usuários conectados

        if(ownerSocket){ // se escistir alguma conexão com o user_id
            request.io.to(ownerSocket).emit('booking_request', booking)
        }

        return response.status(200).json(booking);
    }
};