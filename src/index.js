const bodyParser = require('body-parser')
const express = require('express')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./controller/auth')(app)
require('./controller/projectsAuth')(app)

app.listen(3000,() =>{
    console.log('rodando 3000')
})