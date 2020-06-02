const { Router } = require('express')
const EmployeeController = require('../controllers/EmployeeController')

const ValidToken = require('../middlewares/ValidToken')
const EmployeeValidation = require('../middlewares/EmployeeValidation')

const routes = Router()

routes.get('/',ValidToken.auth, EmployeeController.index)
routes.get('/:id',ValidToken.auth, EmployeeController.show)
routes.post('/',ValidToken.auth, EmployeeValidation, EmployeeController.store)
routes.put('/:id',ValidToken.auth, EmployeeValidation, EmployeeController.update)
routes.delete('/:id',ValidToken.auth, EmployeeController.delete)

module.exports = routes