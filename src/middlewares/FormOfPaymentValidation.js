const { Op } = require('sequelize')
const FormOfPaymentModel = require('../models/FormOfPaymentModel')

const FormOfPaymentValidation = async (req, res, next) => {

    const { nome, ativo } = req.body

    if (!nome) return res.status(400).json({ error: 'O nome é obrigatório' })

    if ((ativo === null) || (ativo === undefined))
        return res.status(400).json({ error: 'O ativo é obrigatório' })

    if (req.params.id) {
        exists = await FormOfPaymentModel.findOne({
            where: {
                id: { [Op.ne]: req.params.id },
                nome: { [Op.eq]: nome },
                ativo: { [Op.eq]: ativo }
            }
        })
    } else {
        exists = await FormOfPaymentModel.findOne({
            where: {
                nome: { [Op.eq]: nome },
                ativo: { [Op.eq]: ativo }
            }
        })
    }

    if (exists) return res.status(400).json({ error: 'A forma de pagamento já existe' })

    next()

}

module.exports = FormOfPaymentValidation