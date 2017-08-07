import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'

export const selectAuthToken = (state) => state.login.authToken

// attempts to login
export function * login (api, { username, password }) {
  const authObj = 'username=' + username + '&password=' + password + '&grant_type=password'

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data.access_token)
    yield put(LoginActions.loginSuccess(response.data))
    yield put(AccountActions.accountRequest())
    yield put({ type: 'RELOGIN_OK' })
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

// attempts to logout
export function * logout (api) {
  // todo I think oauth uses this?
  // const response = yield call(api.logout)
  yield call(api.removeAuthToken)
  yield put(AccountActions.logout())
  yield put(LoginActions.logoutSuccess())
  yield put({ type: 'RELOGIN_ABORT' })
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
    yield call(api.setAuthToken, authToken.access_token)
  }
  yield put(LoginActions.loginLoadSuccess())
}
