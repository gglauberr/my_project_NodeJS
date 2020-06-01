const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})

const UserModel = require('../models/UserModel')

module.exports = {

    async store(req, res) {
        try {
            const { login, password } = req.body
            const user = await UserModel.findOne({
                where: {
                    login: {
                        [Op.eq]: login
                    }
                }
            })
            if (!user) return res.status(200).json({ error: 'Usuário não encontrado' })
            if(!user.ativo) res.status(200).json({ error: 'Usuário bloqueado' })

            const passvalid = await bcrypt.compare(password, user.password)
            if(!passvalid) return res.status(500).json({ error: 'password inválido' })

            const token = jwt.sign({
                id: user.id,
                login: user.login,
                ativo: user.ativo
            }, process.env.TOKEN_SECRET)

            return res.header('auth', token).status(200).json({ token: token })

        } catch(error){
            return res.status(500).json(error)
        }
    }

}