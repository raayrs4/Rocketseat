// Pasta para as rotas de notas, que vão identificar as requisições da aplicação e redirecionar pra o controller correto e o controller lida com o processamento e a resposta dessa requisição

const {Router} = require("express")  // importar o Router de dentro do express

const NotesController = require("../controllers/NotesController") 

const notesRoutes = Router() // criação da constante notesRoutes para inicializar o Route

const notesController = new NotesController()  // como NotesController é uma classe eu preciso instanciar ele na memória

notesRoutes.post("/:user_id", notesController.create) // a rota recebe a requisição e a resposta e repassa para o controler equivalente
// aqui nossa rota tem o endereço ("/"), que chama o notescontroller.create mas passa pelo middleware primeiro

notesRoutes.get("/", notesController.index) // a rota recebe a requisição e a resposta e repassa para o controler equivalente
notesRoutes.get("/:id", notesController.show) // a rota recebe a requisição e a resposta e repassa para o controler equivalente
notesRoutes.delete("/:id", notesController.delete) // a rota recebe a requisição e a resposta e repassa para o controler equivalente

module.exports = notesRoutes // exportando para permitir a utilização do arquivo

// para chamar o meu controler toda vez que essa rota for chamada