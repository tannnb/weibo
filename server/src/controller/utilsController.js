const fsExtra = require('fs-extra')
const path = require('path')
const { SuccessModel, ErrorModel } = require('../utils')
const {
  uploadFileSizeFailInfo
} = require('../conf/ErrorInfo')

// 文件最大体积1M
const MIN_SIZE = 1024 * 1024 * 1024
// 储存路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFolders')

/**
 * <图片上传>
 * @param name 文件名
 * @param type 文件类型
 * @param size 文件体积大小
 * @param filePath 文件路径
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function saveFile ({ name, type, size, filePath }) {
  if (size > MIN_SIZE) {
    await fsExtra.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = `${Date.now()}.${name}` // 防止重名
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fsExtra.move(filePath, distFilePath)
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
