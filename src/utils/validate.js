
/* 用户验证--登录 */
export function validateUserNameLogin (str) {
  const reg = /^(?!\+$)[a-zA-Z0-9-_]+$/
  return reg.test(str)
}

/* 用户验证 */
export function validateUserName (str) {
  const reg = /^(?!\d+$)[a-zA-Z0-9-_]+$/
  return reg.test(str)
}

/* 姓名验证 */
export function validName (str) {
  const reg = /^[\u4e00-\u9fa5]{2,10}$/
  return reg.test(str)
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号验证 */
export function isvalidPhone (str) {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

/* 密码验证 */
export function isvalidPassword (str) {
  const reg = /^[a-zA-Z0-9|_|*|@|%|#|^|.|,|!|$|&|^|-]{6,20}$/
  return reg.test(str)
}

/* 银行卡号验证 */
export function isvalidCard (str) {
  const reg = /^(\d{6}|\d{19})$/
  return reg.test(str)
}

export function luhnCheck (bankno) {
  var lastNum = bankno.substr(bankno.length - 1, 1)// 取出最后一位（与luhn进行比较）
  var first15Num = bankno.substr(0, bankno.length - 1)// 前15或18位
  var newArr = []
  for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  var arrJiShu = [] // 奇数位*2的积 <9
  var arrJiShu2 = [] // 奇数位*2的积 >9

  var arrOuShu = [] // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) { arrJiShu.push(parseInt(newArr[j]) * 2) } else { arrJiShu2.push(parseInt(newArr[j]) * 2) }
    } else // 偶数位
    { arrOuShu.push(newArr[j]) }
  }

  var jishu_child1 = []// 奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = []// 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  }

  var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0 // 偶数位数组之和
  var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }

  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }

  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)

  // 计算luhn值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
  var luhn = 10 - k

  if (lastNum === luhn) {
    return true
  } else {
    return false
  }
}

/**
 * 开户支行 20位
 *  */
export function bankBranch (value) {
  const reS = /^[\u4e00-\u9fa5]{2,20}$/
  return reS.test(value)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// 判断是否是微信浏览器
export function isweixin () {
  const is_weixin = (function () { return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1 })()

  if (is_weixin) {
    return true
  } else {
    return false
  }
}
