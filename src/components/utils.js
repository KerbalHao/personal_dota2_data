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

export {showLogin}