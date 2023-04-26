const path = require("path")
const multer = require("multer")
const crypto = require("crypto")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
//como é uma const de armazenamento ou pasta temporárias, sugere-se que escreva o nome em caixa alta
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

//instalar multer
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex")
      //hash para evitar nomes iguais e não seja substituído
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}