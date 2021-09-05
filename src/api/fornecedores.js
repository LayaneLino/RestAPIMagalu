const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Segue a lista de fornecedores:')
})

module.exports = router