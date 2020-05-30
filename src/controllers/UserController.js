const UserModel = require('../models/UserModel')

module.exports = {

    async index(req, res){
        await UserModel
            .findAll()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    },

    async store(req, res){
        const user = new UserModel(req.body)
        await user
            .save()
            .then(response => {
                return res.status(200).json(response)
            })
            .catch(error => {
                return res.status(500).json(error)
            })
    }

}