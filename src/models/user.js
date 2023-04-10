const mongoose = require('../database')
const bcript = require('bcryptjs')

const UserScheema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,

    },

    email:{
        type: String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default: Date.now
    
    }


})

UserScheema.pre('save', async function(next){
const hash = await bcript.hash(this.password, 10)

this.password = hash
})


const User = mongoose.model('User',UserScheema)

module.exports = User