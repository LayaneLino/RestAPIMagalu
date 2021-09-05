const express = require('express')
const routers = require('./api/index')
const { sequelize } = require('./models/index')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', routers)

sequelize.sync().then(() => {
    console.log('Banco conectado com sucesso.')
})

app.listen(3003, function () {
    console.log('Servidor inicializado...')
})

