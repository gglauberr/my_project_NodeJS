const express = require('express')
const cors = require('cors')
require('./data')

const UserRoutes = require('./routes/UserRoutes')
const DataUserRoutes = require('./routes/DataUserRoutes')

const app = express()


app.use(cors())
app.use(express.json())

app.use('/users', UserRoutes)
app.use('/data_users', DataUserRoutes)

app.listen(3333)