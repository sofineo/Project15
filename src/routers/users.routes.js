const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

//Exemplo de Middleware
//   function myMiddleware(request, response, next) {
//     console.log("Você passou pelo Middleware")
    
//     if(!request.body.isAdmin) {
//       return response.json( { message: "user unauthorized"})
//     }

//     next() //chama a próxima função na pilhama ser executado
// }

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


//como no index.js já está direcionado para userRoutes (este arquivo), não é necessário usar "/users" e somente "/"
//Há como aplicar o middleware numa rota específica, como no exemplo, ou em todas as rotas de uma vez, caso fizer sentido. Para aplicar em todas as rotas:
//usersRoutes.use(myMiddleware)
// usersRoutes.post("/", myMiddleware, usersController.create)

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated,usersController.update) //como no middleware já tem o id, não será mais necessário /:id
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update
)
//patch quando se quer atualizar um campo em específico, no caso, a imagem. A imagem guardamos numa pasta e no banco o endereço

  //exportar para qualquer arquivo poder utilizar
  module.exports = usersRoutes