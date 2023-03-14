/* Padronizar a mensagem que irá aparecer quando tiver algum tipo de exceção -> erro

É necessário adicionar uma biblioteca para entender e lidar com os erros 
npm install express-async-error --save
faz a importação no server.js no começo 
require("express-async-error")
*/

class AppError {
  message;
  statusCode;

  //método construtor é o método/função que é carregada instantaneamente quando a class é instanciada
  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError;