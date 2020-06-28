const { Router } = require('express')
const OrderOfServiceController = require('../controllers/OrderOfServiceController')

const ValidToken = require('../middlewares/ValidToken')
const OrderOfServiceValidation = require('../middlewares/OrderOfServiceValidation')

const routes = Router()

routes.get('/',ValidToken.auth, OrderOfServiceController.index)
routes.get('/:id',ValidToken.auth, OrderOfServiceController.show)
routes.post('/',ValidToken.auth, OrderOfServiceValidation, OrderOfServiceController.store)
routes.put('/:id',ValidToken.auth, OrderOfServiceValidation, OrderOfServiceController.update)
routes.delete('/:id',ValidToken.auth, OrderOfServiceController.delete)

module.exports = routes