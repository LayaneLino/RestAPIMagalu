class ProdutoService {
    constructor(ProdutoModel){
        this.produto = ProdutoModel
    }
    async get(){
        const produtos = await this.produto.findAll()
        return produtos
    }
    async adicionar(produtoDTO){
        const findProduto = await this.produto.findOne({
            where: {
                nome: produtoDTO.nome
            }
        })
        if(findProduto != null){
            throw new Error('Já existe um produto com esse nome no banco de dados.')
        }

        try {
            await this.produto.create(produtoDTO)
        } catch(erro){
            console.erro(erro.mensagem)
            throw erro
        }
    }
}
// npm express-validator
module.exports = ProdutoService