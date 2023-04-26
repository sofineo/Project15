const fs = require("fs") //manipulação de arquivos
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file), 
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
    //rename fará com que mude o arquivo de lugar e não renomear, neste caso

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    //sempre que trabalhamos com arquivos, é interessante usar tratamento de exceções, pois o arquivo pode não mais existir
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}


module.exports = DiskStorage