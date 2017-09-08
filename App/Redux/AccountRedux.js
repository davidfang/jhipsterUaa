import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  accountRequest: ['access_token'],
  accountUpdateRequest: ['account'],
  accountSuccess: ['account'],
  accountUpdateSuccess: ['account'],
  profileUpdateRequest: ['profile'],
  profileUpdateSuccess: ['profile'],
  profileUpdateFailure: ['error'],
  accountFailure: ['error'],
  accountLogout: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  updating: false,
  id: null,
  username: null,
  mobile: null,
  invitation_code: null,
  avatar: null,
  profile: null
})

/* ------------- Reducers ------------- */

// we're attempting to account
export const request = (state) => state.merge({fetching: true})

// we're attempting to updating account settings
export const updateRequest = (state) => state.merge({updating: true})

// we've successfully logged in
export const success = (state, data) => {
  const {account} = data
  return state.merge({fetching: false, error: null, account})
}
// we've successfully updated the account
export const profileUpdateSuccess = (state, data) => {
  const {profile} = data
  return state.merge({error: null, updating: false, profile})
}// we've successfully updated the account
export const updateSuccess = (state, data) => {
  const {account} = data
  return state.merge({error: null, updating: false, ...account})
}

// we've had a problem logging in
export const failure = (state, {error}) => state.merge({...INITIAL_STATE, error})

export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_UPDATE_REQUEST]: updateRequest,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_UPDATE_SUCCESS]: updateSuccess,
  [Types.PROFILE_UPDATE_REQUEST]: updateRequest,
  [Types.PROFILE_UPDATE_SUCCESS]: profileUpdateSuccess,
  [Types.PROFILE_UPDATE_FAILURE]: failure,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_LOGOUT]: logout
})

/* ------------- Selectors ------------- */
