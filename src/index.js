const express = require('express')
const cors = require('cors')
require('./data')

const UserRoutes = require('./routes/UserRoutes')
const DataUserRoutes = require('./routes/DataUserRoutes')
const ClientRoutes = require('./routes/ClientRoutes')
const ProviderRoutes = require('./routes/ProviderRoutes')
const EmployeeRoutes = require('./routes/EmployeeRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const StatusRoutes = require('./routes/StatusRoutes')
const FormOfPaymentRoutes = require('./routes/FormOfPaymentRoutes')
const OrderOfServiceRoutes = require('./routes/OrderOfServiceRoutes')

const app = express()


app.use(cors())
app.use(express.json())

app.use('/users', UserRoutes)
app.use('/data_users', DataUserRoutes)
app.use('/clients', ClientRoutes)
app.use('/providers', ProviderRoutes)
app.use('/employees', EmployeeRoutes)
app.use('/categories', CategoryRoutes)
app.use('/status', StatusRoutes)
app.use('/form_of_payments', FormOfPaymentRoutes)
app.use('/order_of_services', OrderOfServiceRoutes)

app.listen(3333)