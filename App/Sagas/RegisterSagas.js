import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'

// attempts to register
export function * register (api, {user}) {
  const response = yield call(api.register, user)

  // success?
  if (response.ok) {
    // console.tron.log('Register - OK')
    const {status, data} = response.data
    if (status) {
      yield put(RegisterActions.registerSuccess())
      yield call(api.setAuthToken, data.access_token)
      yield put(LoginActions.loginSuccess(data.access_token))
      yield put(AccountActions.accountRequest(data.access_token))

      yield put({type: 'RELOGIN_OK'})
    } else {
      yield put(RegisterActions.registerFailure('Register - FAIL'))
      yield put(RegisterActions.registerFailure(response.data))
    }

  } else {
    // console.tron.log('Register - FAIL')
    yield put(RegisterActions.registerFailure('Register - NET -FAIL'))
    yield put(RegisterActions.registerFailure(response.data))
  }
}

export function * getCaptcha (api, action) {
  const {data} = action
  // make the call to the api
  const response = yield call(api.getCaptcha, data)
  console.log(response)
  try {
    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      const {hash1, hash2, url: captchaUrl} = response.data
      yield put(RegisterActions.captchaSuccess(hash1, hash2, captchaUrl))
    } else {
      yield put(RegisterActions.captchaFailure('NET_WRONG'))
      yield put(RegisterActions.captchaFailure(response))
    }
  } catch (error) {
    yield put(RegisterActions.captchaFailure(error))
  }
}
// 校验图形验证码
export function * checkCaptcha (api, action) {
  const {code} = action

  const respone = yield call(api.checkCaptcha, code)

  try {
    if (respone.ok) {
      const {status, msg} = respone.data
      if (status) {
        yield put(RegisterActions.captchaCheckSuccess(status, msg))
      } else {
        yield put(RegisterActions.captchaCheckFailure(msg))
      }
    } else { //
      yield put(RegisterActions.captchaCheckFailure('CHECK-WANG'))
    }
  } catch (error) {
    yield put(RegisterActions.captchaCheckFailure(error))
  }
}

// 获取手机验证码
export function * getCode (api, action) {
  const {mobile, captcha} = action
  // make the call to the api
  const response = yield call(api.getCode, mobile, captcha)
  console.log(response)
  try {
    // success?
    if (response.ok) {
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      if (response.data.status) {
        const {hash1, hash2, code} = response.data.data
        yield put(RegisterActions.codeSuccess(hash1, hash2, code))
      } else {
        yield put(RegisterActions.codeFailure(response))
      }
    } else {
      yield put(RegisterActions.codeFailure('NET_WRONG'))
      yield put(RegisterActions.codeFailure(response))
    }
  } catch (error) {
    yield put(RegisterActions.codeFailure(error))
  }
}
