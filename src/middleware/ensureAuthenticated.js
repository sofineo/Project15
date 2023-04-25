const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("JWT Token not informed", 401)
  }

  const [, token] = authHeader.split(" ") //irá quebrar no espaço "Bearer xxxxxx". coloca-se [, token] para já colocar o conteúdo na variável e o que nos interessa no caso é so o token, por isso a virgula

  try {
   const { sub: user_id } = verify(token, authConfig.jwt.secret) //sub é o conteúdo armazenado. a propriedade que conseguimos desestruturar do token, com os : conseguimos fazer um alyas passando a chamar de user_id

   request.user = {
    id: Number(user_id)
   }

   return next()
  } catch {
    throw new AppError("Invalid JWT Token", 401)
  }
}

module.exports = ensureAuthenticated