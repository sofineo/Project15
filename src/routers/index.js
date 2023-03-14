//Index.js reunirá todas as rotas/grupos da aplicação

const { Router } = require("express")

const usersRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require('./tags.routes')

const routes = Router()


//será redirecionado para userRoutes toda vez que acessar o /users. O userRoutes é o grupo de rota dos usuários
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)


module.exports = routes