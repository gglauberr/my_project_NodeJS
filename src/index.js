const express = require('express')
const cors = require('cors')
require('./data')

const UserRoutes = require('./routes/UserRoutes')

const app = express()


app.use(cors())
app.use(express.json())

app.use('/users', UserRoutes)

app.listen(3333)