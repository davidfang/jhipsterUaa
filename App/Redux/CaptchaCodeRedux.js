import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  captchaRequest: ['time'],
  captchaSuccess: ['hash1', 'hash2', 'captchaUrl'],
  captchaFailure: ['error'],
  codeRequest: ['mobile', 'captcha'],
  codeSuccess: ['hash1', 'hash2', 'code'],
  codeFailure: ['error'],
})

export const CaptchaCodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  captchaUrl: null,
  captchaHash1: null,
  captchaHash2: null,
  captcha: null,
  codeHash1: null,
  codeHash2: null,
  code: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true })


export const captchaSuccess = (state, action) => {
  const {hash1, hash2, captchaUrl} = action
  return state.merge({fetching: false, error: null, hash1, hash2, captchaUrl})
}
export const captchaFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})



export const codeSuccess = (state, action) => {
  const {hash1, hash2, code} = action
  return state.merge({fetching: false, error: null, codeHash1: hash1, codeHash2: hash2, codeTmp: code})
}
export const codeFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, codeTmp: null})


// Something went wrong somewhere.

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CAPTCHA_REQUEST]: request,
  [Types.CAPTCHA_SUCCESS]: captchaSuccess,
  [Types.CAPTCHA_FAILURE]: captchaFailure,
  [Types.CODE_REQUEST]: request,
  [Types.CODE_SUCCESS]: codeSuccess,
  [Types.CODE_FAILURE]: codeFailure
})
