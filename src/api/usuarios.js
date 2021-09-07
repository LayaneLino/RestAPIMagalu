const express = require("express");
const router = express.Router()
const { usuario } = require('../models')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JWTSecret = 'afdgdherarDFvtsdrterdSdgtdfzgfdzgfzdsf'

router.post('/', 
    async (req, res) => {

    /*
        #swagger.tags = ['Usuário']
        #swagger.description = 'Endpoint para cadastro do cliente.'

        #swagger.responses[200] = {
        description: 'Usuário cadastrado'
    }
        #swagger.responses[400] = {
        description: 'Houve algum problema na requisição.'
        }
    */
        
    const { nome, email, senha } = req.body
    try {
        await usuario.create({ nome, email, senha })
        res.status(201).send('Usuário adicionado com sucesso!')
    } catch(erro) {
        res.status(400).send('Algo eu errado')
    }
})

router.post('/auth', 
    check('email')
    .not().isEmpty()    // não está funcionando
    .withMessage('Campo email é obrigatório!'),
    async (req, res) => {

    /*
        #swagger.tags = ['Usuário']
        #swagger.description = 'Endpoint para login do cliente, disponibilizando o token de acesso aos recursos de produto.'

        #swagger.responses[200] = {
        description: 'Usuário logado'
    }
        #swagger.responses[400] = {
        description: 'Houve algum problema na requisição.'
        }
    */

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, senha } = req.body
    const user = await usuario.findOne({
        where: {
            email: email
        }
    })

    if(user != undefined) {
        if(user.senha == senha) {
            jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn: '48h'},(err, token) => {
                if(err){
                    res.status(400).json('Falha interna!')
                }else {
                    res.status(200).json({token: token})
                }
            })
        } else {
            res.status(401).send('Credenciais inválidas!')
        }
    } else {
        res.status(404).send('Email não cadastrado no banco')
    }
})

module.exports = router