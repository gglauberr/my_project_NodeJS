const { Router } = require('express')
const FormOfPaymentController = require('../controllers/FormOfPaymentController')

const ValidToken = require('../middlewares/ValidToken')
const FormOfPaymentValidation = require('../middlewares/FormOfPaymentValidation')

const routes = Router()

routes.get('/',ValidToken.auth, FormOfPaymentController.index)
routes.get('/:id',ValidToken.auth, FormOfPaymentController.show)
routes.post('/',ValidToken.auth, FormOfPaymentValidation, FormOfPaymentController.store)
routes.put('/:id',ValidToken.auth, FormOfPaymentValidation, FormOfPaymentController.update)
routes.delete('/:id',ValidToken.auth, FormOfPaymentController.delete)

module.exports = routes