const path = require('path')
const router = require('koa-router')()
const multer = require('@koa/multer')
const { saveFile } = require('../controller/utilsController')
router.prefix('/api/utils')

// 储存路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFolders')
const storage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    cb(null, DIST_FOLDER_PATH)
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}.${file.originalname}` // 防止重名
    cb(null, fileName)
  }
})
const upload = multer({ storage: storage })

/**
 * <图片上传>
 */
router.post('/upload', upload.single('file'), async (ctx, next) => {
  const file = ctx.request.file
  const { size, path, filename, mimetype } = file
  ctx.body = await saveFile({ size, path, filename, mimetype })
})

module.exports = router
