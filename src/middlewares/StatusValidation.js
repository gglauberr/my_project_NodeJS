const { Op } = require('sequelize')
const StatusModel = require('../models/StatusModel')

const StatusValidation = async (req, res, next) => {

    const { nome, assunto, ativo } = req.body

    if (!nome) return res.status(400).json({ error: 'O nome é obrigatório' })
    if (!assunto) return res.status(400).json({ error: 'O assunto é obrigatório' })

    if ((ativo === null) || (ativo === undefined))
        return res.status(400).json({ error: 'O ativo é obrigatório' })

    if (req.params.id) {
        exists = await StatusModel.findOne({
            where: {
                id: { [Op.ne]: req.params.id },
                nome: { [Op.eq]: nome },
                assunto: { [Op.eq]: assunto },
                ativo: { [Op.eq]: ativo }
            }
        })
    } else {
        exists = await StatusModel.findOne({
            where: {
                nome: { [Op.eq]: nome },
                assunto: { [Op.eq]: assunto },
                ativo: { [Op.eq]: ativo }
            }
        })
    }

    if (exists) return res.status(400).json({ error: 'O status já existe' })

    next()

}

module.exports = StatusValidation