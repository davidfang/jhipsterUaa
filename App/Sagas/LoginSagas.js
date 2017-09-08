import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'

export const selectAuthToken = (state) => state.login.authToken

// attempts to login
export function * login (api, {identity, password}) {
  // const authObj = 'username=' + username + '&password=' + password + '&grant_type=password'
  const authObj = {identity, password, type: 'miliao'}

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) { // 网络请求成功
    const data = response.data
    if (data.status) { // 用户登录验证成功
      yield call(api.setAuthToken, data.data.access_token)
      yield put(LoginActions.loginSuccess(data.data.access_token))
      // yield put(AccountActions.accountRequest(data.data.access_token))
      yield put({type: 'RELOGIN_OK'})
    } else {
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } else { // 网络请求失败
    yield put(LoginActions.loginFailure('NET_WRONG'))
    yield put(LoginActions.loginFailure('网络请求失败'))
  }
}

// attempts to logout
export function * logout (api) {
  // todo I think oauth uses this?
  // const response = yield call(api.logout)
  yield call(api.removeAuthToken)
  yield put(AccountActions.accountLogout())
  yield put(LoginActions.logoutSuccess())
  yield put({type: 'RELOGIN_ABORT'})
}

export function * loginRefresh (api) {
  const authToken = yield select(selectAuthToken)
  if (authToken !== null) {
    const authObj = 'refresh_token=' + authToken.refresh_token + '&grant_type=refresh_token'
    const response = yield call(api.login, authObj)

    // success?
    if (response.ok) {
      yield call(api.setAuthToken, response.data.access_token)
      yield put(LoginActions.loginSuccess(response.data))
    } else {
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
// loads the login
export function * loginLoad (api) {
  const authToken = yield select(selectAuthToken)
  // only set the token if we have it
  if (authToken !== null) {
    yield call(api.setAuthToken, authToken)
    const response = yield call(api.getAccount)

    if (response.ok) {
      const data = response.data
      if (data.status) { // 用户登录验证成功
        // yield put(PasswordActions.changePasswordFailure(data))

        yield call(api.setAuthToken, authToken)
        yield put(LoginActions.loginLoadSuccess())
        yield put(AccountActions.accountUpdateSuccess(response.data.data))
      } else {
        yield put(LoginActions.loginFailure('LOGIN-WRONG'))
        yield put(LoginActions.loginFailure(data))

        yield logout(api)
      }
    } else {
      yield put(LoginActions.loginFailure('NET-WRONG'))

      yield logout(api)
    }
  }
}
