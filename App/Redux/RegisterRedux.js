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
  captchaUrl:null,
  hash1: null,
  hash2: null,
  checkCode: null,
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

// Something went wrong somewhere.
export const captchaFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})
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
  [Types.CAPTCHA_CHECK]: request,
  [Types.CAPTCHA_CHECK_SUCCESS]: captchaCheckSuccess,
  [Types.CAPTCHA_CHECK_FAILURE]: captchaCheckFailure
})

/* ------------- Selectors ------------- */

