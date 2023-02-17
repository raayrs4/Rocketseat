// Pasta para as rotas de notas, que vão identificar as requisições da aplicação e redirecionar pra o controller correto e o controller lida com o processamento e a resposta dessa requisição

const {Router} = require("express")  // importar o Router de dentro do express

const TagsController = require("../controllers/TagsController") 

const tagsRoutes = Router() // criação da constante notesRoutes para inicializar o Route

const tagsController = new TagsController()  // como NotesController é uma classe eu preciso instanciar ele na memória

tagsRoutes.get("/:user_id", tagsController.index) // a rota recebe a requisição e a resposta e repassa para o controler equivalente


module.exports = tagsRoutes // exportando para permitir a utilização do arquivo


// para chamar o meu controler toda vez que essa rota for chamada