import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['user'],
  registerSuccess: [],
  registerFailure: ['error'],

  captchaRequest: ['time'],
  captchaSuccess: ['hash1', 'hash2', 'captchaUrl'],
  captchaFailure: ['error'],
  codeRequest: ['mobile', 'captcha'],
  codeSuccess: ['hash1', 'hash2', 'code'],
  codeFailure: ['error'],
  captchaCheck: ['code'],
  captchaCheckSuccess: ['status', 'msg'],
  captchaCheckFailure: ['error']
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  checkCode: false,
  checkCaptcha: false,
  captchaUrl: null,
  hash1: null,
  hash2: null,
  captcha: null,
  codeHash1: null,
  codeHash2: null,
  code: null
})

/* ------------- Reducers ------------- */

// we're attempting to register
export const request = (state) => state.merge({ fetching: true })

// we've successfully registered
export const success = (state, data) => state.merge({ fetching: false, error: null })

// we've had a problem registering
export const failure = (state, { error }) => state.merge({ fetching: false, user: null, error })








export const captchaSuccess = (state, action) => {
  const {hash1, hash2, captchaUrl} = action
  return state.merge({fetching: false, error: null, hash1, hash2, captchaUrl})
}
export const captchaCheckSuccess = (state, action) => {
  const { status, msg } = action
  return state.merge({fetching: false, checkCode: status, error: msg})
}

export const codeSuccess = (state, action) => {
  const {hash1, hash2, code} = action
  return state.merge({fetching: false, error: null, codeHash1: hash1, codeHash2: hash2, codeTmp: code})
}


// Something went wrong somewhere.
export const captchaFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})
export const codeFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, codeTmp: null})
export const captchaCheckFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure,
  [Types.CAPTCHA_REQUEST]: request,
  [Types.CAPTCHA_SUCCESS]: captchaSuccess,
  [Types.CAPTCHA_FAILURE]: captchaFailure,
  [Types.CODE_REQUEST]: request,
  [Types.CODE_SUCCESS]: codeSuccess,
  [Types.CODE_FAILURE]: codeFailure,
  [Types.CAPTCHA_CHECK]: request,
  [Types.CAPTCHA_CHECK_SUCCESS]: captchaCheckSuccess,
  [Types.CAPTCHA_CHECK_FAILURE]: captchaCheckFailure
})

/* ------------- Selectors ------------- */

