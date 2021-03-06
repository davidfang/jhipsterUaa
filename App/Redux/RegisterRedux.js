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
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to register
export const request = (state) => state.merge({ fetching: true })

// we've successfully registered
export const success = (state, data) => state.merge({ fetching: false, error: null })

// we've had a problem registering
export const failure = (state, { error }) => state.merge({ fetching: false, user: null, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure
})

/* ------------- Selectors ------------- */

