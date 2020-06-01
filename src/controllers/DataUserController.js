const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const DataUserModel = require('../models/DadaUserModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const data_user = await DataUserModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!data_user) return res.status(400).json({ error: 'dados do usuário não encontrado' })

            return res.status(200).json(data_user)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        const user_id = req.user.id

        const { nome, telefone, celular, logradouro, numero, complemento,
            cep, bairro, cidade, estado, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })


        await DataUserModel
            .create({
                nome, telefone, celular, logradouro, numero, complemento,
                cep, bairro, cidade, estado, ativo, user_id
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async show(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const data_user = await DataUserModel.findOne({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    id: {
                        [Op.eq]: id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!data_user) return res.status(400).json({ error: 'dados do usuário não encontrado' })

            return res.status(200).json(data_user)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const { nome, telefone, celular, logradouro, numero, complemento,
            cep, bairro, cidade, estado, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const data_user = await DataUserModel.findOne({
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                id: {
                    [Op.eq]: id
                },
                ativo: {
                    [Op.eq]: true
                }
            }
        })

        if (!data_user) return res.status(400).json({ error: 'dados do usuário não encontrado' })

        await data_user
            .update({
                nome, telefone, celular, logradouro, numero, complemento,
                cep, bairro, cidade, estado, ativo, user_id
            })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async delete(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const data_user = await DataUserModel.findOne({
            where: {
                user_id: {
                    [Op.eq]: user_id
                },
                id: {
                    [Op.eq]: id
                },
                ativo: {
                    [Op.eq]: true
                }
            }
        })

        if (!data_user) return res.status(400).json({ error: 'dados do usuário não encontrado' })

        await data_user
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}