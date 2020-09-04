const express = require('express');
const { request, response } = require('express');
const multer = require('multer')
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')

const DashboardController = require('./controllers/DashboardController')

const BookingController = require('./controllers/BookingController')

const routes = express.Router()
const upload = multer(uploadConfig)

//----------------------Rotas da Session-----------------------------------------------

routes.get('/sessions', SessionController.index)

routes.post('/sessions', SessionController.store)

routes.delete('/sessions/:email', SessionController.delete)

//----------------------Rotas da Session------------------------------------------------

//----------------------Rotas do Spot---------------------------------------------------
routes.get('/spots/', SpotController.index); // Lista spots por filtro de techs

routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.delete('/spots', SpotController.delete);
//----------------------Rotas do Spot---------------------------------------------------

//----------------------Rotas do Dashborad----------------------------------------------
routes.get('/dashboard', DashboardController.show);// Lista spots pela user: id do usuário 
//----------------------Rotas do Dashboard----------------------------------------------

//----------------------Rotas do Booking------------------------------------------------
routes.post('/spots/:spot_id/bookings', BookingController.store) // id do spot sem ser o user id mas o ObjectId
//----------------------Rotas do Booking------------------------------------------------

module.exports = routes;