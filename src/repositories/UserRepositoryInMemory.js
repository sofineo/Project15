//Para não poluirmos o banco de dados com teste, criamos um "bando de dados em memória"

class UserRepositoryInMemory {
  users = [];

  //apesar de manipulação de arrays não ser assincrono, a função está async para simular o banco de dados
  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email)
  }
}

module.exports = UserRepositoryInMemory