const { store } = require("./BookingController");

const Booking = require('../models/Booking')

module.exports = {
    async store(request, response){
        const { booking_id } = request.params

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = request.connectedUsers[booking.user]; // pegando id dos usuários que está solicitando a reserva

        if(bookingUserSocket){ // se escistir alguma conexão com o user_id
            request.io.to(bookingUserSocket).emit('booking_response', booking)
        }

        return response.json(booking);
    }
}