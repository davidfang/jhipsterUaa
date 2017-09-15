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
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
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
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth) // 设置token
  const removeAuthToken = () => api.setHeader('Authorization', '') // 删除token
  const setFormData = () => api.setHeader('Content-Type', 'multipart/form-data;charset=utf-8') // 设置form data文件上传
  const login = (userAuth) => api.post('api/v1/sign-in/login', userAuth) // 登录
  const register = (user) => api.post('api/v1/sign-in/signup', user) // 注册
  const forgotPassword = (data) => api.post('api/v1/sign-in/reset-password', data) // 忘记密码

  const getAccount = () => api.get('api/v1/profile/index') // 用户中心 获得用户信息
  const updateAccount = (account) => api.put('api/v1/profile/update', account) // 更新用户信息
  const changePassword = (data) => api.post('api/v1/sign-in/reset-password', data) // 修改密码

  const getCaptcha = () => api.get('site/captcha', {refresh: 'refresh'}) // 获取图片验证码
  const checkCaptcha = (code) => api.get('site/check-captcha', {code}) // 校验图片验证码
  const getCode = (mobile, captcha) => api.get('sms-api/get-code', {mobile, id: 1, captcha}) // 获取手机验证码

  const getProvince = (parentId) => api.get('api/v1/prov-city-area-street/index', {parentId}) // 获得省市区信息

  // ignite-jhipster-api-method-needle
  const uploadAvatar = (formData) => api.post('api/v1/profile/avatar-upload',formData) //上传图像
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
    setFormData,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,

    getCaptcha,
    checkCaptcha,
    getCode,

    getProvince,
    uploadAvatar
  }
}

// let's return back our create method as the default.
export default {
  create
}
