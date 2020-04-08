function showLogin() {
  this.$createDialog({
    type: 'confirm',
    icon: 'cubeic-alert',
    content: '您尚未登陆，请确认是否现在登录？',
    confirmBtn: {
      text: '确定',
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    cancelBtn: {
      text: '取消',
      active: false,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm: () => {
      this.$router.push('/mine/login')
    },
    onCancel: () => {
      this.$createToast({
        type: 'warn',
        time: 1000,
        txt: '您需要登录后才可进行该操作'
      }).show()
    }
  }).show()
}
function deepClone(data) {
  return JSON.parse(JSON.stringify(data))
}
function stringify(data) {
  return JSON.stringify(data)
}

function parse(data) {
  return JSON.parse(data)
}
function arrayDuplicate(data = []) {
  // 数组去重

  let temp = {};

  for (let i = 0; i < data.length; i++) {
    let cur = data[i].category;
    if (temp[cur] === cur || !cur) {
      // 计算每个category 购物车中的物品数量
      data[i].num += data[data.length - 1].num
      data[i] = data[data.length - 1];
      data.length--;
      i--;
      continue;
    }
    temp[cur] = cur;
  }
  temp = null;
  return data;
}

function errCB() {
    this.$createDialog({
      type: 'alert',
      icon: 'cubeic-alert',
      content: '访问服务器超时 \n 请检查网络后刷新重试！'
    }).show()
}
export {showLogin, deepClone,stringify,parse,arrayDuplicate,errCB}