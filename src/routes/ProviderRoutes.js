const { Router } = require('express')
const ProviderController = require('../controllers/ProviderController')

const ValidToken = require('../middlewares/ValidToken')
const ProviderValidation = require('../middlewares/ProviderValidation')

const routes = Router()

routes.get('/',ValidToken.auth, ProviderController.index)
routes.get('/:id',ValidToken.auth, ProviderController.show)
routes.post('/',ValidToken.auth, ProviderValidation, ProviderController.store)
routes.put('/:id',ValidToken.auth, ProviderValidation, ProviderController.update)
routes.delete('/:id',ValidToken.auth, ProviderController.delete)

module.exports = routes