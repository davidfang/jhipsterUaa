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
import AppSetActions from '../Redux/AppSetRedux'

export function * getAppSet (api, action) {
  const {data} = action
  // make the call to the api
  const response = yield call(api.getappSet, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AppSetActions.appSetSuccess(response.data))
  } else {
    yield put(AppSetActions.appSetFailure())
  }
}

export function * getAppSetProvince (api, action) {
  const {parentId} = action
  // make the call to the api
  const response = yield call(api.getProvince, parentId)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    const {status, data} = response.data
    //yield put(AppSetActions.provinceFailure(response))

    if (status) {
      const d = {}
      for (let v of data) {
        d[v.code] = v.name
      }

      if (data[0].level == 1) {
        yield put(AppSetActions.provinceSuccess(d, 'province'))
      } else if (data[0].level == 2) {
        yield put(AppSetActions.provinceSuccess(d, 'city'))
      } else if (data[0].level == 3) {
        yield put(AppSetActions.provinceSuccess(d, 'area'))
      }
    } else {
      yield put(AppSetActions.provinceFailure('获取地区 服务端错误'))
    }
  } else {
    yield put(AppSetActions.provinceFailure('获取地区 网络错误'))
  }
}
