const { Op } = require('sequelize')
const OrderOfServiceModel = require('../models/OrderOfServiceModel')

const OrderOfServiceValidation = async (req, res, next) => {

    const { data_hora, descricao, observacao, ativo } = req.body

    if (!data_hora) return res.status(400).json({ error: 'A data e a hora são obrigatórios' })
    if (!descricao) return res.status(400).json({ error: 'A descricao é obrigatório' })

    if ((ativo === null) || (ativo === undefined))
        return res.status(400).json({ error: 'O ativo é obrigatório' })

    if (req.params.id) {
        exists = await OrderOfServiceModel.findOne({
            where: {
                id: { [Op.ne]: req.params.id },
                data_hora: { [Op.eq]: data_hora },
                descricao: { [Op.eq]: descricao },
                observacao: { [Op.eq]: observacao },
                ativo: { [Op.eq]: ativo }
            }
        })
    } else {
        exists = await OrderOfServiceModel.findOne({
            where: {
                data_hora: { [Op.eq]: data_hora },
                descricao: { [Op.eq]: descricao },
                observacao: { [Op.eq]: observacao },
                ativo: { [Op.eq]: ativo }
            }
        })
    }

    if (exists) return res.status(400).json({ error: 'A ordem de serviço já existe' })

    next()

}

module.exports = OrderOfServiceValidation