import { call, put } from 'redux-saga/effects'
import PasswordActions from '../Redux/PasswordRedux'
import { callApi } from './CallApiSaga'
import LoginActions from '../Redux/LoginRedux'
// attempts to request a password reset
export function * forgotPassword (api, {mobile, code, password}) {
  const response = yield call(api.changePassword, {mobile, code, password, smsid: 1})
  // success?
  if (response.ok) {
    console.tron.log('ChangePasswordRequest - OK')
    if (response.data.status) {
      yield put(PasswordActions.changePasswordSuccess('修改密码成功'))
      yield put(LoginActions.loginLoad())
    } else {
      yield put(PasswordActions.changePasswordFailure('修改密码失败'))
      // yield put(PasswordActions.changePasswordFailure(response))
    }

  } else {
    console.tron.log('ChangePassword - FAIL')
    yield put(PasswordActions.changePasswordFailure('网络错误'))
  }
}

// attempts to request a password change
export function * changePassword (api, {mobile, code, password}) {
  const apiCall = call(api.changePassword, {mobile, code, password, smsid: 1})
  const response = yield call(callApi, apiCall)
  // const passObj = {mobile, code, password, smsid: 1}
  // const response = yield call(api.changePassword, passObj)
  // success?
  if (response.ok) {
    console.tron.log('ChangePasswordRequest - OK')
    if (response.data.status) {
      yield put(PasswordActions.changePasswordSuccess('修改密码成功'))
      yield put(LoginActions.loginLoad())
    } else {
      yield put(PasswordActions.changePasswordFailure('修改密码失败'))
      // yield put(PasswordActions.changePasswordFailure(response))
    }

  } else {
    console.tron.log('ChangePassword - FAIL')
    yield put(PasswordActions.changePasswordFailure('网络错误'))
  }
}
