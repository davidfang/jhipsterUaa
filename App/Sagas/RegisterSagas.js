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
      yield put(RegisterActions.registerFailure('注册失败'))
      // yield put(RegisterActions.registerFailure(response.data))
    }

  } else {
    // console.tron.log('Register - FAIL')
    yield put(RegisterActions.registerFailure('网络错误'))
    yield put(RegisterActions.registerFailure(response.data))
  }
}

