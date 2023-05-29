//Por padrão, cada serviço pode ter um teste
const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be created", async () => {
    //simulamos os inputs
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
  
    // const userRepositoryInMemory = new UserRepositoryInMemory()
    // const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)
  
  
    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be created with existed email", async() => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    }

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    }

    // const userRepositoryInMemory = new UserRepositoryInMemory()
    // const userCreateService = new UserCreateService(userRepositoryInMemory)

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está cadastrado."))
    //outra possibilidade:
    // expect(async() => { 
    //   await userCreateService.execute(user2)
    // }).rejects.toEqual(new AppError("Este e-mail já está cadastrado."))
  })

})


