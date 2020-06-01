const { Router } = require('express')
const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

const UserValidation = require('../middlewares/UsersValidation')
const ValidToken = require('../middlewares/ValidToken')

const routes = Router()

routes.get('/', UserController.index)
routes.get('/:id', UserController.show)
routes.post('/', UserValidation, UserController.store)
routes.put('/:id',ValidToken.auth, UserValidation, UserController.update)
routes.delete('/:id',ValidToken.auth, UserController.delete)

routes.post('/auth', SessionController.store)

module.exports = routes