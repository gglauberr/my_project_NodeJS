const { Router } = require('express')
const ClientController = require('../controllers/ClientController')

const ValidToken = require('../middlewares/ValidToken')
const ClientValidation = require('../middlewares/ClientValidation')

const routes = Router()

routes.get('/',ValidToken.auth, ClientController.index)
routes.get('/:id',ValidToken.auth, ClientController.show)
routes.post('/',ValidToken.auth, ClientValidation, ClientController.store)
routes.put('/:id',ValidToken.auth, ClientValidation, ClientController.update)
routes.delete('/:id',ValidToken.auth, ClientController.delete)

module.exports = routes