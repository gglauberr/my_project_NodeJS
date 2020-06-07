const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const ProviderModel = require('../models/ProviderModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const provider = await ProviderModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                },
                include: {
                    association: 'categories',
                    required: false,
                    attributes: ['id', 'nome'],
                    through: {
                        attributes: []
                    },
                    where: {
                        ativo: {
                            [Op.eq]: true
                        }
                    }
                }
            })

            if (!provider) return res.status(400).json({ error: 'fornecedor não encontrado' })

            return res.status(200).json(provider)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        try {
            const user_id = req.user.id

            const { nome, telefone, celular, logradouro, numero, complemento,
                cep, bairro, cidade, estado, email, ativo, categorias } = req.body

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            if (categorias.length === 0) {
                return res.status(400).json({ error: 'A categoria não foi informada' })
            }

            const provider = await ProviderModel
                .create({
                    nome, telefone, celular, logradouro, numero, complemento,
                    cep, bairro, cidade, estado, email, ativo, user_id
                })

            provider.setCategories(categorias)

            return res.status(200).json(provider)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async show(req, res) {
        try {
            const user_id = req.user.id
            const id = req.params.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const provider = await ProviderModel.findOne({
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
                },
                include: {
                    association: 'categories',
                    required: false,
                    attributes: ['id', 'nome'],
                    through: {
                        attributes: []
                    },
                    where: {
                        ativo: {
                            [Op.eq]: true
                        }
                    }
                }
            })

            if (!provider) return res.status(400).json({ error: 'fornecedor não encontrado' })

            return res.status(200).json(provider)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        try {
            const user_id = req.user.id

            const id = req.params.id

            const { nome, telefone, celular, logradouro, numero, complemento,
                cep, bairro, cidade, estado, email, site, facebook, instagram, ativo, categorias } = req.body

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            if (categorias.length === 0) {
                return res.status(400).json({ error: 'A categoria não foi informada' })
            }

            const provider = await ProviderModel.findOne({
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

            if (!provider) return res.status(400).json({ error: 'fornecedor não encontrado' })

            await provider
                .update({
                    nome, telefone, celular, logradouro, numero, complemento,
                    cep, bairro, cidade, estado, email, site, facebook, instagram, ativo, user_id
                })

            provider.setCategories(categorias)

            return res.status(200).json(provider)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async delete(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const provider = await ProviderModel.findOne({
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

        if (!provider) return res.status(400).json({ error: 'fornecedor não encontrado' })

        await provider
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}