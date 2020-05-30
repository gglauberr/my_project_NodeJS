const { Router } = require('express')
const UserController = require('../controllers/UserController')
const UserValidation = require('../middlewares/UsersValidation')

const routes = Router()

routes.get('/', UserController.index)
routes.get('/:id', UserController.show)
routes.post('/', UserValidation, UserController.store)
routes.put('/:id', UserValidation, UserController.update)
routes.delete('/:id', UserController.delete)

module.exports = routes