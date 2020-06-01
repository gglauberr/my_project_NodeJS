const jwt = require('jsonwebtoken')

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})

module.exports = {

    auth(req, res, next){
        const token = req.header('auth')
        if(!token) return res.status(401).json({ error: 'Acesso negado' })

        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            if(!verified) return res.status(400).json({ error: 'Acesso negado' })
            
            req.user = verified

            next()

        }catch(error){
            return res.status(400).json({ error: 'Token inválido' })
        }
    }

}