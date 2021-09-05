const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointFile = ['./src/app.js']

const doc = {
    info:{
        version: '2.0.0',
        title: "Magalu Produtos API",
        description: "Api para consumir endpoint relacionados aos produtos da Magalu.",

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
    }
}

swaggerAutogen(outputFile, endpointFile, doc)