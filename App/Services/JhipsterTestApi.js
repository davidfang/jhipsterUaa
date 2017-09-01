export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  // -----------------------------------------------
  setAuthToken: (userAuth) => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  removeAuthToken: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  login: (userAuth) => {
    const user = require('../Fixtures/user.json')
    const {username, password} = userAuth
    if (username == user.username && password == user.password) {
      return {
        ok: true,
        data: {
          status: true,
          data: {
            access_token: user.access_token
          }
        }
      }
    } else {
      return {
        ok: true,
        data: {
          status: false,
          msg: '用户或密码不正确'
        }
      }
    }
  },
  register: (user) => {
    const {username, password} = user
    const userInfo = require('../Fixtures/user.json')
    if (username !== userInfo.username && password.length > 5 && password.length < 12) {
      return {
        ok: true,
        data: {
          status: true,
          data: {
            access_token: 'sdf@##9sldfw2'
          }
        }
      }
    } else {
      return {
        ok: true,
        data: {
          status: false,
          msg: '注册失败'
        }
      }
    }
  },
  forgotPassword: (data) => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getAccount: () => {
    const accounts = require('../Fixtures/account.json')
    if (accounts !== null) {
      return {
        ok: true,
        data: accounts["getAccount"]
      }
    } else {
      return {
        ok: false,
        data: {
          message: '获取用户信息失败'
        }
      }
    }

  },
  updateAccount: (account) => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  changePassword: (newPassword) => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getCode: (mobile, captcha) => {
    return {
      ok: true,
      data: {
        status: true,
        data: {
          code: "2834",
          hash1: 209,
          hash2: 209,
          msg: "短信发送成功"
        }
      }
    }
  }

}
