require("express-async-errors")    // como minha aplicação vai lidar no tratamento de exceções

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")

const cors = require("cors")
const express = require("express"); // importando todas as funcionalidades do express
const routes = require("./routes") // por padrão, como não estou especificando qual arquivo eu quero, ele vai carrecar o index.js

migrationsRun() // executando as migrations do meu banco de dados

const app = express();// inicializando o express para conseguir usar ele
app.use(cors())
app.use(express.json()) //Dizendo p aplicação o padrão/formato das informações do body

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

// uma requisição do tipo get na nossa aplicação (Ou seja, alguém tá querendo ler alguma coisa) // dentro tem a rota e uma função
// app.get("/message/:id/:user", (request, response) => {  // consigo dessa função extrair a requisição que foi feita e o recurso que eu posso utilizar para responder a requisicão // colocando dois pontos antes do id a aplicação sabe que isso é um parâmetro e eu posso trabalhar com esse valor, é usado para informações mais simples // os paramentros não são opcionais, eles fazem parte da minha rota, eu tenho que colocar eles na minha URL
//   const {id, user} = request.params // desestruturando id e user de request.params para poder usar utilizando apenas o nome id ou user ao invés de "request.params.user"

//   response.send(`
//   Mensagem ID: ${id}.
//   Para o usuário: ${user}.`)  // utilizando o response para devolver a resposta para quem solicitou // a informação que tá sendo passada como um parâmetro tá sendo recuperada através de um request.params.id
// }) 


// app.get("/users", (request, response) => {
//   const {page, limit} = request.query // não estou buscando essas informações como um parâmetro mas como uma query // a query é opcional, mesmo que eu não passe os valores de page e limit vai funcionar 

//   response.send(`Página ${page}. Mostrar: ${limit}`)
// })


app.use((error, request, response, next) => {          // o error é pra capturar o error da requisição, o response utilizamos para devolver a resposta, que pode ser por erro do cliente ou por erro do servidor
  if(error instanceof AppError) { 
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })

})

const PORT = 3333; // dizendo para o express em que "porta" que ele vai ficar observando/atendendo as requisições 
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) // Coloco um listen no app para que quando a aplicação seja inicializada ele execute uma função, que nesse caso é a impressão da mensagem