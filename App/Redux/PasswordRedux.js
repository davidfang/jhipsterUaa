import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgotPasswordRequest: ['mobile', 'code', 'password'],
  forgotPasswordSuccess: ['response'],
  forgotPasswordFailure: ['error'],

  changePasswordRequest: ['mobile', 'code', 'password'],
  changePasswordSuccess: ['response'],
  changePasswordFailure: ['error'],

  passInit: []
})

export const PasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  change: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to request a password reset email
export const request = (state) => state.merge({ fetching: true })

// we've successfully request to reset the password
export const success = (state, data) => state.merge({ fetching: false, error: null, change: true})

// we've had a problem requesting to reset the password
export const failure = (state, { error }) => state.merge({ fetching: false, error })

// init password
export const passInit = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD_REQUEST]: request,
  [Types.FORGOT_PASSWORD_SUCCESS]: success,
  [Types.FORGOT_PASSWORD_FAILURE]: failure,

  [Types.CHANGE_PASSWORD_REQUEST]: request,
  [Types.CHANGE_PASSWORD_SUCCESS]: success,
  [Types.CHANGE_PASSWORD_FAILURE]: failure,
  [Types.PASS_INIT]: passInit
})

/* ------------- Selectors ------------- */

