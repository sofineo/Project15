const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
    //this é o contexto global dessa classe
    //quem for usar a class é quem dirá qual o banco de dados que será utilizado (inversão de dependência)
  }

  async execute({ name, email, password }) {
    
    const checkIfUserExists = await this.userRepository.findByEmail(email)

    if (checkIfUserExists){
      throw new AppError("Este e-mail já está cadastrado.");
    }

    //antes de inserir no banco de dados, iremos cryptografar a senha, sendo o primeiro parametro a variavel, e o segundo a complexidade. Sempre colocar await pois é uma Promise
    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword})

    return userCreated
  }
}

module.exports = UserCreateService