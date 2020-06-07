const { Op } = require('sequelize')
const UserModel = require('../models/UserModel')
const FormOfPaymentModel = require('../models/FormOfPaymentModel')

module.exports = {

    async index(req, res) {
        try {
            const user_id = req.user.id

            const user = await UserModel.findByPk(user_id)
            if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

            const formOfPayment = await FormOfPaymentModel.findAll({
                where: {
                    user_id: {
                        [Op.eq]: user_id
                    },
                    ativo: {
                        [Op.eq]: true
                    }
                }
            })

            if (!formOfPayment) return res.status(400).json({ error: 'Forma de pagamento não encontrada' })

            return res.status(200).json(formOfPayment)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async store(req, res) {
        const user_id = req.user.id

        const { nome, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })


        await FormOfPaymentModel
            .create({
                nome, ativo, user_id
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

            const formOfPayment = await FormOfPaymentModel.findOne({
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

            if (!formOfPayment) return res.status(400).json({ error: 'Forma de pagamento não encontrada' })

            return res.status(200).json(formOfPayment)

        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async update(req, res) {
        const user_id = req.user.id

        const id = req.params.id

        const { nome, telefone, celular, logradouro, numero, complemento,
            cep, bairro, cidade, estado, email, ativo } = req.body

        const user = await UserModel.findByPk(user_id)
        if (!user) return res.status(400).json({ error: 'usuário não encontrado' })

        const formOfPayment = await FormOfPaymentModel.findOne({
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

        if (!formOfPayment) return res.status(400).json({ error: 'Forma de pagamento não encontrada' })

        await formOfPayment
            .update({
                nome, telefone, celular, logradouro, numero, complemento,
                cep, bairro, cidade, estado, email, ativo, user_id
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

        const formOfPayment = await FormOfPaymentModel.findOne({
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

        if (!formOfPayment) return res.status(400).json({ error: 'Forma de pagamento não encontrada' })

        await formOfPayment
            .update({ ativo: false })
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}