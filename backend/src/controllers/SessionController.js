const axios = require('axios')
const Users = require('../models/User');


module.exports = {

   async index(request, response) {
     try{
      const users = await Users.find() 

      return response.status(200).json(users)

     }catch(erros){
      return response.status(400).json({ message: "User Not Found" })
     }

   },

   async store (request, response) {
      try{
         const { email } = request.body

         const users = await Users.create({
            email
         })
   
         return response.status(201).json(users)
      }catch(error){
         return response.status(400).json({ message: 'Cadastro não pode ser realizado, tente novamente' })
      }
    },
    
    async delete(request, response){
       
         const { email }= request.params

         let user = await Users.findOne({ email })
      
         if(user){
            await Users.findOneAndDelete({ email });
            return response.status(200).json({ message: 'Usuário excluído com sucesso' })

         }else{
          return response.status(400).json({ message: 'Não foí possível deletar' })
       }
       
    }
};