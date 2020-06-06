const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const CategoryModel = require('../models/CategoryModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const category = await CategoryModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!category) return res.status(400).json({ error: 'dados do usuário não encontrado' })

            return res.status(200).json(category)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        const user_id = req.user.id

        const { nome, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })


        await CategoryModel
            .create({ nome, ativo, user_id})
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

            const category = await CategoryModel.findOne({
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

            if (!category) return res.status(400).json({ error: 'Categoria não encontrada' })

            return res.status(200).json(category)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const { nome, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const category = await CategoryModel.findOne({
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

        if (!category) return res.status(400).json({ error: 'Categoria não encontrada' })

        await category
            .update({nome, ativo, user_id})
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

        const category = await CategoryModel.findOne({
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

        if (!category) return res.status(400).json({ error: 'categoria não encontrada' })

        await category
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}