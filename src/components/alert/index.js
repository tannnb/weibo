import AlertPortal from './AlertPortal.js'

let messageInstance
function getMessageInstance () {
  messageInstance = messageInstance || AlertPortal.newInstance()
  return messageInstance
}

AlertPortal.show = function (options) {
  let instance = getMessageInstance()
  instance.show(options)
}

AlertPortal.hide = function () {
  if (!messageInstance) {
    return false
  }
  const instance = getMessageInstance()
  instance.hide()
}

export default AlertPortal
