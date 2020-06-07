const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const StatusModel = require('../models/StatusModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const status = await StatusModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!status) return res.status(400).json({ error: 'status não encontrado' })

            return res.status(200).json(status)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        const user_id = req.user.id

        const { nome, assunto, ativo } = req.body

        const nomeUp = nome.toUpperCase()
        const assuntoUp = assunto.toUpperCase()

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        await StatusModel
            .create({
                nome: nomeUp, assunto: assuntoUp, ativo, user_id
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

            const status = await StatusModel.findOne({
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

            if (!status) return res.status(400).json({ error: 'status não encontrado' })

            return res.status(200).json(status)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const { nome, assunto, ativo } = req.body

        const nomeUp = nome.toUpperCase()
        const assuntoUp = assunto.toUpperCase()

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const status = await StatusModel.findOne({
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

        if (!status) return res.status(400).json({ error: 'status não encontrado' })

        await status
            .update({
                nome: nomeUp, assunto: assuntoUp, ativo, user_id
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

        const status = await StatusModel.findOne({
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

        if (!status) return res.status(400).json({ error: 'status não encontrado' })

        await status
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}