import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  appSetRequest: ['data'],
  appSetSuccess: ['payload'],
  appSetFailure: ['error'],
  provinceRequest: ['parentId'],
  provinceSuccess: ['childData', 'provinceType'],
  provinceFailure: ['error']

})

export const AppSetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  province: null,
  city: null,
  area: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: null})
export const provinceRequest = (state, {parentId}) =>
  state.merge({fetching: true})

// successful api lookup
export const success = (state, action) => {
  const {payload} = action
  return state.merge({fetching: false, error: null, payload})
}
export const provinceSuccess = (state, action) => {
  const {childData, provinceType} = action
  return state.merge({fetching: false, error: null, [provinceType]: childData})
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({fetching: false, error, payload: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_SET_REQUEST]: request,
  [Types.APP_SET_SUCCESS]: success,
  [Types.APP_SET_FAILURE]: failure,
  [Types.PROVINCE_REQUEST]: provinceRequest,
  [Types.PROVINCE_SUCCESS]: provinceSuccess,
  [Types.PROVINCE_FAILURE]: failure

})
