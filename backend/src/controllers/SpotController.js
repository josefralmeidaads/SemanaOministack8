const Spot = require('../models/Spot')



module.exports = {
    async index(request, response){
        const { tech } = request.query
        
        const spots = await Spot.find({ techs: tech }) // filtrando spots por techs que recebo de minha query

        if(spots){
            return response.status(200).json(spots);
        }else{
            return response.status(400).json({ error: 'Not Found' });
        }

        return response.status(200).json(spots)
    },

     async store(request, response) {
        const { filename } = request.file
        const { company, price, techs} = request.body
        const { user_id } = request.headers

        const techsArray = techs.split(',').map(tech => tech.trim()); // split vai criar elementos de array pela vírgula, e o trim remove os espaços das strings

        const spot = await Spot.create({
            thumbnail: filename,
            company,
            price,
            techs: techsArray,
            user: user_id
        })

        return response.status(200).json(spot)
    },

    async delete(request, response) {
        const { user_id } = request.headers

        const spot = await Spot.findOne({ user: user_id })

        if( spot ){
            await Spot.findOneAndDelete({ user: user_id });

            return response.status(200).json({sucess: 'Spot Excluída com Sucesso'})
        }else {
            return response.status(400).json({error: 'Spot Doesnt Exists'})
        }
    }
}