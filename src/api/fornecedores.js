const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {

    /*
        #swagger.tags = []
        #swagger.description = 'Endpoint não trabalhado.'

        #swagger.responses[200] = {
        description: 'Lista encontrada'
    }
        #swagger.responses[400] = {
        description: 'Houve algum problema na requisição.'
        }
    */

    res.send('Segue a lista de fornecedores:')
})

module.exports = router