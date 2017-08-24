// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'
import { Buffer } from 'buffer'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  /*const login = (userAuth) => api.post('api/v1/sign-in/login', userAuth, {
    headers: {
      'Authorization': 'Basic ' + new Buffer(AppConfig.oauthClientId + ':' + AppConfig.oauthClientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, *!/!*'
    }
  })*/
  const login = (userAuth) => api.post('api/v1/sign-in/login', userAuth, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    }
  })
  const register = (user) => api.post('api/v1/sign-in/signup', user)
  const forgotPassword = (data) => api.post(AppConfig.uaaBaseUrl + 'api/account/reset_password/init', data, {
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'application/json, text/plain, */*'
    }
  })

  const getAccount = (access_token) => api.get('api/v1/profile/index', {'access-token':access_token})
  const updateAccount = (account) => api.post(AppConfig.uaaBaseUrl + 'api/account', account)
  const changePassword = (newPassword) => api.post(AppConfig.uaaBaseUrl + 'api/account/change_password', newPassword, {
    headers: {
      'Content-Type': 'text/plain',
      'Accept': 'application/json, text/plain, */*'
    }
  })

  const getCaptcha = () => api.get('site/captcha', {refresh: 'refresh'}) // 获取图片验证码
  const checkCaptcha = (code) => api.get('site/check-captcha', { code }) // 校验图片验证码
  const getCode = (mobile, captcha) => api.get('sms-api/get-code', {mobile, id: 1, captcha}) // 获取手机验证码
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,

    getCaptcha,
    checkCaptcha,
    getCode
  }
}

// let's return back our create method as the default.
export default {
  create
}
