const sqlite3 = require("sqlite3") //drive de fato que será a comunicação com a database
const sqlite = require("sqlite") //responsável por conectar
const path = require("path") //para não deixar o diretório travado

//função assíncrona, pois como irá lidar com banco de dados e no momento que a aplicação iniciar e o arquivo do banco de dados não existe, e na primeira vez ele não vai existir, vai criar o banco de dados pra gente de forma automática, não vai criar o conteúdo, mas sim o arquivo para conseguir manipular. Se já existir, ele vai se conectar, e tudo isso leva tempo/steps que nào acontecem no mesmo momento
async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection