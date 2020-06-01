const DataUserModel = require('../models/DadaUserModel')

const DataUserValidation = async (req, res, next) => {

    const { ativo } = req.body

    if((ativo === null) || (ativo === undefined)) 
        return res.status(400).json({ error: 'O ativo é obrigatório' })
    
    next()

}

module.exports = DataUserValidation