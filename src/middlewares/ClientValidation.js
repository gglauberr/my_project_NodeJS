const { Op } = require('sequelize')
const ClientModel = require('../models/ClientModel')

const ClientValidation = async (req, res, next) => {

    const { nome, celular, ativo } = req.body

    if (!nome) return res.status(400).json({ error: 'O nome é obrigatório' })
    if (!celular) return res.status(400).json({ error: 'O celular é obrigatório' })

    if ((ativo === null) || (ativo === undefined))
        return res.status(400).json({ error: 'O ativo é obrigatório' })

    if (req.params.id) {
        exists = await ClientModel.findOne({
            where: {
                id: { [Op.ne]: req.params.id },
                nome: { [Op.eq]: nome },
                celular: { [Op.eq]: celular },
                ativo: { [Op.eq]: ativo }
            }
        })
    } else {
        exists = await ClientModel.findOne({
            where: {
                nome: { [Op.eq]: nome },
                celular: { [Op.eq]: celular },
                ativo: { [Op.eq]: ativo }
            }
        })
    }

    if (exists) return res.status(400).json({ error: 'O cliente já existe' })

    next()

}

module.exports = ClientValidation