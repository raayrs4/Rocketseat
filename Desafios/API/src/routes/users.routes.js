// Pasta para as rotas de usuário, que vão identificar as requisições da aplicação e redirecionar pra o controller correto e o controller lida com o processamento e a resposta dessa requisição

const {Router} = require("express")  // importar o Router de dentro do express

const UsersController = require("../controllers/UsersController") 

const usersRoutes = Router() // criação da constante usersRoutes para inicializar o Route

const usersController = new UsersController()  // como UserController é uma classe eu preciso instanciar ele na memória

usersRoutes.post("/", usersController.create) // a rota recebe a requisição e a resposta e repassa para o controler equivalente
// aqui nossa rota tem o endereço ("/"), que chama o userscontroller.create mas passa pelo middleware primeiro
usersRoutes.put("/:id", usersController.update)

module.exports = usersRoutes // exportando para permitir a utilização do arquivo


// para chamar o meu controler toda vez que essa rota for chamada