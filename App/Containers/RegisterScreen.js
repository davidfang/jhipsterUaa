import React from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RegisterActions from '../Redux/RegisterRedux'
import t from 'tcomb-form-native'
import AppConfig from '../Config/AppConfig'

import CountDownButton from '../Components/CountDownButton'

import { CountDown, Captcha } from '../Components/CustomTcomb'
// Styles
import styles from './Styles/RegisterScreenStyle'

let Form = t.form.Form

class RegisterScreen extends React.Component {

  constructor (props) {
    super(props)
    const {checkCode, captchaUrl} = props
    this.state = {
      captcha: '',
      checkCode,
      captchaUrl: captchaUrl,
      accountValue: {
        mobile: null,
        password: null,
        confirmPassword: null,
        captcha: null,
        code: null,
        langKey: 'en'
      },
      success: false
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
    this.handleRefreshCaptcha = this.handleRefreshCaptcha.bind(this)
    this.handleCheckCaptcha = this.handleCheckCaptcha.bind(this)
    this.handleCheckCode = this.handleCheckCode.bind(this)
    this.captchaImage = this.captchaImage.bind(this)
    this.coutDown = this.coutDown.bind(this)
    this.countDownPress = this.countDownPress.bind(this)
  }

  componentWillMount () {
    this.handleRefreshCaptcha()
  }

  /**
   * 刷新验证码
   */
  handleRefreshCaptcha = () => {
    this.props.getCaptcha()
  }
  /**
   * 校验图形验证码
   */
  handleCheckCaptcha = () => {
    let {accountValue: {captcha}} = this.state
    const {hash1, hash2} = this.props
    if (captcha == '' || captcha == null) {
      return false
    }
    captcha = captcha.toLowerCase()
    let a = 0
    for (let i = 0; i < captcha.length; i++) {
      a += captcha.charAt(i).charCodeAt()
    }
    console.log(a)
    if (a == hash1 || a == hash2) {
      return true
    } else {
      return false
    }
  }
  /**
   * 校验手机验证码
   */
  handleCheckCode = () => {
    let {accountValue: {code}} = this.state
    const {codeHash1, codeHash2} = this.props
    if (code == '' || code == null) {
      return false
    }
    code = code.toLowerCase()
    let a = 0
    for (let i = 0; i < code.length; i++) {
      a += code.charAt(i).charCodeAt()
    }
    console.log(a)
    if (a == codeHash1 || a == codeHash2) {
      return true
    } else {
      return false
    }

  }

  submitUpdate () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('Error', '输入的密码不一致', [{text: 'OK'}])
        return
      }
      if (this.handleCheckCaptcha() == false) {
        Alert.alert('Error', '请输入正确图形验证码', [{text: 'OK'}])
        return
      }
      if (this.handleCheckCode() == false) {
        Alert.alert('Error', '请输入正确手机验证码', [{text: 'OK'}])
        return
      }

      this.props.register({...value,username: value.mobile, type: 'miliao'})
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    // Did the register attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        Alert.alert('Error', newProps.error, [{text: 'OK'}])
      } else {
        /* this.setState({
         success: true
         })
         Alert.alert('Registration Successful', 'Please check your email', [{text: 'OK'}])
         NavigationActions.pop() */
      }
    }
  }

  accountChange (newValue) {
    this.setState({
      accountValue: newValue
    })
  }

  /**
   * 图片验证码
   * @returns {XML}
   */
  captchaImage () {
    const {captchaUrl} = this.props
    const {apiUrl} = AppConfig
    return (
      <TouchableOpacity onPress={this.handleRefreshCaptcha}>
        <Image source={{uri: apiUrl + captchaUrl}}
               style={{width: 120, height: 40}}/>
      </TouchableOpacity>
    )
  }

  /**
   * 倒计时获取手机验证码
   * @returns {XML}
   */
  coutDown () {
    return (
      <CountDownButton frameStyle={{right: 5, marginLeft: 15, flex: 1.5, height: 36}}
                       beginText='获取验证码'
                       endText='再次获取验证码'
                       count={10}
                       pressAction={ this.countDownPress}
                       changeWithCount={(count) => count + 's后重新获取'}
                       id='register'
                       ref={(e) => {this.countDownButton = e}}
      />
    )
  }

  /**
   * 倒计时按钮 按下 触发动作
   */
  countDownPress () {
    let {accountValue: {mobile, captcha}} = this.state
    if (mobile.length < 11) {
      Alert.alert('Error', '手机格式不对', [{text: 'OK'}])
      return false
    }

    if (this.handleCheckCaptcha()) {
      this.props.getCode(mobile, captcha)
      this.countDownButton.startCountDown()
      Alert.alert('发送成功', '手机验证码3分钟内会发放', [{text: 'OK'}])
    } else {
      Alert.alert('Error', '请核对图形验证码', [{text: 'OK'}])
    }

  }

  render () {
    var state = {
      accountModel: t.struct({
        mobile: t.String,
        password: t.String,
        confirmPassword: t.String,
        captcha: t.String,
        code: t.String,
        langKey: t.String
      }),
      accountValue: this.state.accountValue,
      options: {
        fields: {
          mobile: {
            label: '手机',
            placeholder: '请输入手机号',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            label: '密码',
            placeholder: '请输入密码',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: '确认密码',
            placeholder: '请再次输入密码',
            secureTextEntry: true,
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitUpdate()
          },
          captcha: {
            label: '图片验证',
            placeholder: '图片验证',
            template: Captcha,
            config: {
              captcha: this.captchaImage
            }
          },
          code: {
            label: '验证码',
            placeholder: '验证码',
            template: Captcha,
            config: {
              captcha: this.coutDown
            }
            // factory: CountDown
          },
          langKey: {
            hidden: true
          }
        }
      }
    }
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref='form'
            type={state.accountModel}
            options={state.options}
            value={state.accountValue}
            onChange={this.accountChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitUpdate} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  const {register: {captchaUrl, checkCode, hash1, hash2, codeHash1, codeHash2}} = state
  return {
    fetching: state.register.fetching,
    error: state.register.error,
    captchaUrl,
    checkCode,
    hash1,
    hash2,
    codeHash1,
    codeHash2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account)),
    getCaptcha: () => dispatch(RegisterActions.captchaRequest()),
    getCode: (mobile, captcha) => dispatch(RegisterActions.codeRequest(mobile, captcha)),
    checkCaptcha: (code) => dispatch(RegisterActions.captchaCheck(code))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
