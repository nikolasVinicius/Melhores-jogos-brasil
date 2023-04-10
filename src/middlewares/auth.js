const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req,res,next) =>{
    
    const authHeader = req.headers.authorization

    if(!authHeader)
    return res.status(400).send({"erro:":"não há authenticação"})

    const parts = authHeader.split(' ')

    if(!parts.length === 2)
    return res.status(400).send({"erro:":"header não"})

    const [scheme, token] = parts

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({"erro:":"token não formatado"})

    jwt.verify(token,authConfig.secret,(err, decoded)=>{
        if(err)
        return res.status(401).send({"erro:":"token invalido"})
        req.userId = decoded.id

        return next()
    })

}