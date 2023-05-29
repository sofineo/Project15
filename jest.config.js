module.exports = {
  bail: true, //se um falhar, ele para, não continuando os outros teste (vem desligado por padrão)
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js" //na hora que o teste for executar, ele vai ignorar os outros arquivos que nao seja spec.js e pedidno pra olhar a pasta src, pulando a pasta node_module que não precisa ser testada, agilizando o teste.
  ],



}