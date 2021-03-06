const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointFile = ['./src/app.js']

const doc = {
    info:{
        version: '2.0.0',
        title: "Magalu Produtos API",
        description: "Api para consumir endpoints relacionados aos produtos da Magalu com mecanismo de autenticação de usuário.",

    },
    host: "localhost:3003",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
        "name": "Produtos",
        "description": "Endpoints relacionados aos recursos de produto."
        },
        {
        "name": "Usuário",
        "description": "Endpoints relacionados aos recursos de usuário."    
        }
    ],
    definitions: {
        Produto: {
            id: 1,
            nome: 'DELL',
            preco: 5000,
            create_at: '2021-01-09 13:05:36',
            updated_at: '2021-01-09 13:05:40'
        },
        NovoProduto: {
            $nome: 'Dell',
            $preco: 5000
        }
    },
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: 'header',
            name: 'authorization',
            description: 'Insira seu token aqui.'
        },
    },
}

swaggerAutogen(outputFile, endpointFile, doc)