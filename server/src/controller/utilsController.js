const fsExtra = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../utils')
const { uploadFileSizeFailInfo } = require('../conf/ErrorInfo')

// 文件最大体积1M
const MIN_SIZE = 1024 * 1024 * 1024

/**
 * <图片上传>
 * @param name 文件名
 * @param type 文件类型
 * @param size 文件体积大小
 * @param filePath 文件路径
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function saveFile ({ size, path, filename, mimetype }) {
  if (size > MIN_SIZE) {
    await fsExtra.remove(path)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  return new SuccessModel({
    url: filename
  })
}

module.exports = {
  saveFile
}
