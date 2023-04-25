//parte responsável por processar as requisições da aplicação, a parte "inteligente" da aplicação, aonde terá as regras de negócio. A camada que de fato irá executar aquilo que o usuário solicitou. Ex. verificar se o usuário existe, cadastro de um produto, etc

//usa-se class e não uma função simples, por a classe permite que dentro dela possa ter várias funções e acessar várias funções


//hash é a função do bcryptsjs que gera a cryptografia
const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite")

class UsersController {
/**Best-practice: um controller pode ter até 5 métodos/funções: 
* index - GET para listar várias registros.
* show - GET para exibir um registro específico. (ex. carregar as informações de um usuário específico)
* create - POST para criar um registro.
* update - PUT para atualizar um registro.
* delete - DELETE para remover um registro.

Se precisar criar mais de 5 métodos, vale a pena analisar e criar um controller separado
É comum também o controller ter apenas um método, ex index. Não tem a obrigação de ter necessariamente todos os métodos
 */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkIfUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if (checkIfUserExists){
      throw new AppError("Este e-mail já está cadastrado.");
    }

    //antes de inserir no banco de dados, iremos cryptografar a senha, sendo o primeiro parametro a variavel, e o segundo a complexidade. Sempre colocar await pois é uma Promise
    const hashedPassword = await hash(password, 8);


    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    // if(!name) { throw new AppError("Nome é obrigatório!")}

    // response.status(201).json({ name, email, password})

    return response.status(201).json();
}

  async update(request, response) {
    const { name, email, password, old_password} = request.body
    // const { id } = request.params //como temos já o id incorporado nas requisições, não é necessário mais buscar pelo parametro
    const user_id = request.user.id

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    //verificar se o novo e-mail cadastrado existe na base e se é de outro id
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Esse e-mail já está em uso")
    }

    
    user.name = name ?? user.name // se existir conteúdo no name, ele será utilizado, do contrário será o outro (nullish operator)
    user.email = email ?? user.email

    if( password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    if (password && old_password){
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere")
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id]
    )

    return response.status(200).json()
  }
}

module.exports = UsersController