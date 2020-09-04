const Spot = require('../models/Spot')

module.exports = {
    async show(request, response) {
        const { user_id } = request.headers

        if(user_id){
            const spot = await Spot.find({ user: user_id })
            return response.status(200).json(spot)
        }else {
            return response.status(400).json({ error: 'Usuário não tem nenhuma spot cadastrada!'})
        }
    },
}