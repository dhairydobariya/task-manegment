let express = require('express')
let app = express()
let route = require('./routes/routes')

const bodyparser = require('body-parser')
const mongoose = require('./database/db')
const cookieparser = require('cookie-parser')
require('dotenv').config();

app.use(cookieparser())
app.use(bodyparser.urlencoded({extended : true}))
app.use('/',route)

let port = process.env.PORT


mongoose

app.listen(port , (req ,res) => {
    console.log(`its run on port ${port}`)
})
