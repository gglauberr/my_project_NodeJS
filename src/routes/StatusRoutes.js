const { Router } = require('express')
const StatusController = require('../controllers/StatusController')

const ValidToken = require('../middlewares/ValidToken')
const StatusValidation = require('../middlewares/StatusValidation')

const routes = Router()

routes.get('/',ValidToken.auth, StatusController.index)
routes.get('/:id',ValidToken.auth, StatusController.show)
routes.post('/',ValidToken.auth, StatusValidation, StatusController.store)
routes.put('/:id',ValidToken.auth, StatusValidation, StatusController.update)
routes.delete('/:id',ValidToken.auth, StatusController.delete)

module.exports = routes