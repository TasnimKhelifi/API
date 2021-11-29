const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const app = express()
const userApi = require('./routes/user')

mongoose.connect(process.env.MONGO_INFO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('connected to database successfully.')
    })
    .catch(err => {
        console.log(err)
    })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/user', userApi)
module.exports = app