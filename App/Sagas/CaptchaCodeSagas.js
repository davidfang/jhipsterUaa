/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import CaptchaCodeActions from '../Redux/CaptchaCodeRedux'

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
      yield put(CaptchaCodeActions.captchaSuccess(hash1, hash2, captchaUrl))
    } else {
      yield put(CaptchaCodeActions.captchaFailure('NET_WRONG'))
      yield put(CaptchaCodeActions.captchaFailure(response))
    }
  } catch (error) {
    yield put(CaptchaCodeActions.captchaFailure(error))
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
        yield put(CaptchaCodeActions.codeSuccess(hash1, hash2, code))
      } else {
        yield put(CaptchaCodeActions.codeFailure(response))
      }
    } else {
      yield put(CaptchaCodeActions.codeFailure('NET_WRONG'))
      yield put(CaptchaCodeActions.codeFailure(response))
    }
  } catch (error) {
    yield put(CaptchaCodeActions.codeFailure(error))
  }
}
