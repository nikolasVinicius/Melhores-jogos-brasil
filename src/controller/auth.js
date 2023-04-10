const express = require('express')
const bcript = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const router = express.Router()



function generateToken(params = {}){
   return jwt.sign({id: User.id}, authConfig.secret,{
    expiresIn:86400,})
   
}


router.post('/register', async (req,res)=>{
    try {
        const {email} = req.body

        if (await User.findOne({ email }))
        return res.status(400).send({"erro:":"usuario ja existente"})
     

        const user = await User.create(req.body)
        
        user.password = undefined
  
        return res.send({
            user,
            token:generateToken({id:user.id})
        })
    } catch (error) {
        return res.status(400).send({"erro:":"Desconhecido"})
    }
}
)

router.post('/authenticate',async(req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email}).select('+password')

    if(!user)
    return res.status(400).send({"erro:":"usuario não existe"})

    if (!await bcript.compare(password,user.password))
    return res.status(400).send({"erro":"senha incorreta"})
    user.password = undefined


 
    res.send({
        user,
        token:generateToken({ id:user.id })
    })
})


module.exports = app => app.use('/auth',router)