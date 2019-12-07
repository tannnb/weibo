import ToastPortal from './ToastPortal.js';

let messageInstance;
function getMessageInstance () {
    messageInstance = messageInstance || ToastPortal.newInstance();
    return messageInstance;
}


ToastPortal.show = function (options) {
    let instance = getMessageInstance();
    instance.show(options);
}


ToastPortal.hide = function () {
    if (!messageInstance) {
        return false;
    }
    const instance = getMessageInstance();
    instance.hide();
}


export default ToastPortal
