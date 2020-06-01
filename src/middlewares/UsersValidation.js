const { Op } = require('sequelize')
const UsersModel = require('../models/UserModel')

const UserValidation = async (req, res, next) => {

    const regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/
    const { login, password, ativo } = req.body

    if(!login) return res.status(400).json({ error: 'O login é obrigatório' })
    if(!regex.test(login)) return res.status(400).json({ error: 'O email não é válido' })

    if(!password) return res.status(400).json({ error: 'O password é obrigatório' })
    
    if((ativo === null) || (ativo === undefined)) 
        return res.status(400).json({ error: 'O ativo é obrigatório' })

    let exists

    if(req.params.id){
        exists = await UsersModel.findOne({ 
            where: {
                id: { [Op.ne]: req.params.id },
                login: { [Op.eq] : login } 
            }
        })
    }else{
        exists = await UsersModel.findOne({
            where: {
                login: { [Op.eq] : login } 
            }
        })
    }

    if(exists) return res.status(400).json({ error: 'O usuário já existe' })

    next()
}

module.exports = UserValidation