//GET - Leitura
//POST - Criação
//PUT - Atualização
//DELETE - deleção
//PATCH - Atualização parcial

//a camada server é o ponto de entrada da nossa aplicação, quando um requisição chega nele, vai passar pelas rotas (routes) para que seja identificado qual o controller que será executado, o que o usuário está pedindo. Então, baseado na rota, no caminho, no endereço, irá será entregue para um determinado controller, que irá executar a requisição, que devolver pra rota que por fim saberá pra quem deve devolver através do server.js


require("express-async-error")
require("express-async-errors")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")



const migrationsRun = require("./database/sqlite/migrations")

//importar a express
const express = require("express");


//por padrão, quando não é mencionado o nome do arquivo, o programa carregará o arquivo nomeado index, por isso não é necessário dizer "./routers/index.js", somente ./routers já carregará o arquivo index que estamos agrupando todas as rotas nele, enxutando o código
const routes = require("./routers")

migrationsRun()

//para conseguir inicializar o express que nos ajuda a gerenciar as requisições http

const cors = require("cors")
const app = express();

app.use(cors())

//para receber as coisas em JSON no método post para receber as informações do body
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)


app.use(( error, request, response, next) => {
  //se o error for da instancia AppError é pq foi gerado  pelo cliente
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  //para conseguir debugar caso precise
  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })

})

//requisição do tipo get (ler algo) /: 'nome'(entender que é um parâmetro) -> route params. São obritório, pois fazem parte do endereço/ da route

// app.get("/message/:id/:user", (request, response) => {
//   const { id, user} = request.params;

//   response.send(`Mensagem ID: ${id}. 
//   Para o usuário: ${user}`)
// })

//parms são utilizados para dados simples exemplo id
// Query Params - ? (separador) primeiro query / & (separador) segundo em diante query: os valores são opcionais. 
// app.get("/users", (request, response) => {
//   const { page, limit } = request.query

//   response.send(`Página: ${page}. Mostrar: ${limit}`)
// })

//Todos os outros tipo diferentes do GET não é possível verificar pelo browser, somente pelo Insomnia
// app.post("/users", (request, response) => {
// const { name, email, password} = request.body;

//   response.send(`Usuário: ${name} - E-mail: ${email} - Senha ${password}`)
// })

//sempre usamos o send para enviar uma resposta. que retorna na página um html, mas podemos devolver informação por padrão json:
// app.post("/users", (request, response) => {
//   const { name, email, password} = request.body;
  
//     response.json({ name, email, password})
//   })
  

//informar qual porta 
const PORT = 3333;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

//No terminal digitar node e pasta no caso "node scr/server.js"

//No package.js colocar no script  "start": "node ./src/server.js"