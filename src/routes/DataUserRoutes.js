const { Router } = require('express')
const DataUserController = require('../controllers/DataUserController')

const ValidToken = require('../middlewares/ValidToken')
const DataUserValidation = require('../middlewares/DataUserValidation')

const routes = Router()

routes.get('/',ValidToken.auth, DataUserController.index)
routes.get('/:id',ValidToken.auth, DataUserController.show)
routes.post('/',ValidToken.auth, DataUserValidation, DataUserController.store)
routes.put('/:id',ValidToken.auth, DataUserValidation, DataUserController.update)
routes.delete('/:id',ValidToken.auth, DataUserController.delete)

module.exports = routes