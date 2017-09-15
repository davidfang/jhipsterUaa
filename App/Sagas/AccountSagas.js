import { call, put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import LoginActions from '../Redux/LoginRedux'
import { callApi } from './CallApiSaga'

// attempts to account
export function * getAccount (api, action) {
  const {access_token} = action
  const response = yield call(api.getAccount)

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
    if (response.data.status) {
      //yield put(AccountActions.accountFailure(response))
      yield put(AccountActions.accountUpdateSuccess(response.data.data))
    } else {
      console.tron.log('Account - FAIL')
      yield put(AccountActions.accountFailure(response))
      yield put(AccountActions.accountFailure('更新失败'))
    }
  } else {
    console.tron.log('AccountUpdate - FAIL')
    yield put(AccountActions.accountFailure('网络错误'))
  }
}
// attempts to profile
export function * getProfile (api, action) {

  const response = yield call(api.getAccount)

  // success?
  if (response.ok) {
    const data = response.data
    if (data.status) {
      console.tron.log('profile - OK')
      yield put(AccountActions.profileUpdateSuccess(data.data))
    } else {
      console.tron.log('profile - FAIL')
      yield put(AccountActions.profileUpdateFailure(response))
      yield put(AccountActions.profileUpdateFailure('WRONG' + data.message))
    }
  } else {
    console.tron.log('profile - FAIL')
    yield put(AccountActions.profileUpdateFailure('NET_WRONG'))
  }
}

// attempts to update profile settings
export function * updateProfile (api, action) {
  const {profile} = action
  const apiCall = call(api.updateAccount, profile)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.tron.log('profileUpdate - OK')
    if (response.data.status) {
      //yield put(AccountActions.profileUpdateFailure(response))
      yield put(AccountActions.profileUpdateSuccess(response.data.data))
    } else {
      console.tron.log('profile - FAIL')
      yield put(AccountActions.profileUpdateFailure(response))
      yield put(AccountActions.profileUpdateFailure('更新失败'))
    }
  } else {
    console.tron.log('profileUpdate - FAIL')
    yield put(AccountActions.profileUpdateFailure('网络错误'))
  }
}

export function * uploadAvatar (api, action) {
  const {fileUrl, fileName} = action

  let formData = new FormData()

  let file = {uri: fileUrl, type: 'application/octet-stream', name: fileName}
  formData.append('file', file)
  yield call(api.setFormData)
  const response = yield call(api.uploadAvatar, formData)

  if (response.ok) { // success?
    if (response.data.status) {

      yield put(AccountActions.uploadAvatarSuccess(response.data.data.files[0].url))
    } else {
      yield put(AccountActions.uploadAvatarFailure('上传失败'))
    }
  } else { // failure
    yield put(AccountActions.uploadAvatarFailure('网络错误'))
  }
  yield put({type: 'UPLOAD AVATAR END'})
}
