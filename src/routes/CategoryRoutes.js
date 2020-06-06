const { Router } = require('express')
const CategoryController = require('../controllers/CategoryController')

const ValidToken = require('../middlewares/ValidToken')
const CategoryValidation = require('../middlewares/CategoryValidation')

const routes = Router()

routes.get('/',ValidToken.auth, CategoryController.index)
routes.get('/:id',ValidToken.auth, CategoryController.show)
routes.post('/',ValidToken.auth, CategoryValidation, CategoryController.store)
routes.put('/:id',ValidToken.auth, CategoryValidation, CategoryController.update)
routes.delete('/:id',ValidToken.auth, CategoryController.delete)

module.exports = routes