// Pasta para as rotas de usuário, que vão identificar as requisições da aplicação e redirecionar pra o controller correto e o controller lida com o processamento e a resposta dessa requisição
const { Router } = require("express")  // importar o Router de dentro do express
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController") 
const UserAvatarController = require("../controllers/UserAvatarController") 
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router() // criação da constante usersRoutes para inicializar o Route
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()  // como UserController é uma classe eu preciso instanciar ele na memória
const userAvatarController = new UserAvatarController()  // como UserAvatarController é uma classe eu preciso instanciar ele na memória

usersRoutes.post("/", usersController.create) // a rota recebe a requisição e a resposta e repassa para o controler equivalente
// aqui nossa rota tem o endereço ("/"), que chama o userscontroller.create mas passa pelo middleware primeiro
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes // exportando para permitir a utilização do arquivo


// para chamar o meu controler toda vez que essa rota for chamadas