import { takeLatest,takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import JHIPSTER_API from '../Services/JhipsterApi'
import FixtureAPI from '../Services/FixtureApi'
import JHIPSTER_TEST_API from '../Services/JhipsterTestApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AppSetTypes } from '../Redux/AppSetRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { PasswordTypes } from '../Redux/PasswordRedux'
import { OpenScreenTypes } from '../Redux/OpenScreenRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { CaptchaCodeTypes } from '../Redux/CaptchaCodeRedux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getAppSet, getAppSetProvince } from './AppSetSagas'
import { login, logout, loginLoad, loginRefresh } from './LoginSagas'
import { register } from './RegisterSagas'
import { forgotPassword, changePassword } from './PasswordSagas'
import { getUserAvatar } from './GithubSagas'
import { openScreen } from './OpenScreenSagas'
import { getAccount, updateAccount, updateProfile, uploadAvatar } from './AccountSagas'
import { getCaptcha, getCode } from './CaptchaCodeSagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
// todo set up fixtures for the JHipster API
// const jhipsterApi = DebugConfig.useFixtures ? JHIPSTER_API.create() : JHIPSTER_TEST_API
const jhipsterApi = JHIPSTER_API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {

  yield  [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeEvery(AppSetTypes.PROVINCE_REQUEST, getAppSetProvince, jhipsterApi),
    takeLatest(OpenScreenTypes.OPEN_SCREEN, openScreen),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, jhipsterApi),
    takeLatest(LoginTypes.LOGIN_REFRESH, loginRefresh, jhipsterApi),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, jhipsterApi),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, jhipsterApi),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, jhipsterApi),
    takeLatest(PasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, jhipsterApi),
    takeLatest(PasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, jhipsterApi),

    takeLatest(CaptchaCodeTypes.CAPTCHA_REQUEST, getCaptcha, jhipsterApi),
    takeLatest(CaptchaCodeTypes.CODE_REQUEST, getCode, jhipsterApi),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, jhipsterApi),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, jhipsterApi),
    takeLatest(AccountTypes.UPLOAD_AVATAR_REQUEST, uploadAvatar, jhipsterApi),
    takeLatest(AccountTypes.PROFILE_UPDATE_REQUEST, updateProfile, jhipsterApi),
    // ignite-jhipster-saga-redux-connect-needle

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, jhipsterApi)
  ]

}
