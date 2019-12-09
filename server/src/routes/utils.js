const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../controller/utilsController')
router.prefix('/api/utils')
/**
 * <图片上传>
 */
router.post('/upload', koaForm(), async (ctx, next) => {
  console.log('111')
  const file = ctx.request.files
  const { size, path, name, type } = file
  ctx.body = await saveFile({ name, type, size, path })
})

module.exports = router
