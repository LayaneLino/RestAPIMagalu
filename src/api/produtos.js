const express = require('express')
const router = express.Router()
const { produto } = require('../models/index') // ou apenas ../models, o node entende que vc quer o index
const ProdutoService = require('../service/produtos')
const { body, check, validationResult } = require('express-validator')
const auth = require('./function')

const produtoService = new ProdutoService(produto)

router.get('/', auth, async (req, res) => {
    /*
        #swagger.tags = ['Produtos']
        #swagger.description = 'Endpoint para obter uma lista de produtos.'

        #swagger.security = [{
            "apiKeyAuth":[]
        }]
        #swagger.responses[200] = {
        schema: { $ref: "#/definitions/Produto"},
        description: 'Produto encontrado'
    }
        #swagger.responses[404] = {
            description: 'Lista não encontrada.'
        }
        #swagger.responses[400] = {
            description: 'Houve algum problema na requisição.'
        }
    */
    const produtos = await produtoService.get()
    res.status(200).json(produtos)
})

router.post('/', auth,
    body('nome').not().isEmpty().trim().escape(),
    check('preco')
        .not()
        .isEmpty()
        .matches(/\d/)
        .withMessage('O preço deve ser um número.'),
    async (req, res) => {
        /*
            #swagger.tags = ['Produtos']
            #swagger.description = 'Endpoint para criar um novo produto.'
            #swagger.parameters['novoProduto'] = {
                in: 'body',
                description: 'Informações do produto',
                required: true,
                type: 'object',
                schema: { $ref: "#/definitions/NovoProduto" }
            }
            #swagger.security = [{
                "apiKeyAuth":[]
            }]
            #swagger.responses[201] = {
                description: 'Produto criado'
            }
            #swagger.responses[400] = {
                description: 'Os campos nome e preço são obrigatórios.'
            }
        */

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const { nome, preco } = req.body;
            try {
              await produtoService.adicionar({ nome, preco });
              res.status(201).send("Produto adicionado com sucesso!");
            } catch (erro) {
              res.status(400).send(erro.message);
            }
          }
        );
        
        module.exports = router;
        