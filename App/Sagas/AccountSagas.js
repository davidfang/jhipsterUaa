import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import LoginActions from '../Redux/LoginRedux'
import { callApi } from './CallApiSaga'

// attempts to account
export function * getAccount (api, action) {
  const {access_token} = action
  const response = yield call(api.getAccount, access_token)

  // success?
  if (response.ok) {
    const data = response.data
    if (data.status) {
      console.tron.log('Account - OK')
      yield put(AccountActions.accountSuccess(data.data))
    } else {
      console.tron.log('Account - FAIL')
      yield put(AccountActions.accountFailure(response))
      yield put(AccountActions.accountFailure('WRONG' + data.message))
      yield put(LoginActions.logoutRequest())
    }
  } else {
    console.tron.log('Account - FAIL')
    yield put(AccountActions.accountFailure('NET_WRONG'))
    yield put(LoginActions.logoutRequest())
  }
}

// attempts to update account settings
export function * updateAccount (api, action) {
  const {account} = action
  const apiCall = call(api.updateAccount, account)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.tron.log('AccountUpdate - OK')
    yield put(AccountActions.accountUpdateSuccess(account))
  } else {
    console.tron.log('AccountUpdate - FAIL')
    yield put(AccountActions.accountFailure('WRONG'))
  }
}
