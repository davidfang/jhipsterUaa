import React from 'react'
import { Alert, ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import PasswordActions from '../Redux/PasswordRedux'
import LoginActions from '../Redux/LoginRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/ForgotPasswordScreenStyle'

import { Captcha as Custom } from '../Components/CustomTcomb'
import Captcha from './Captcha'
import Code from './Code'
let Form = t.form.Form

class ForgotPasswordScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      formValue: {password: null, confirmPassword: null, captcha: null, mobile: null, code: null},
      success: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
    this.coutDown = this.coutDown.bind(this)
  }

  /**
   * 图片验证码
   * @returns {XML}
   */
  captchaImage () {
    return (
      <Captcha />
    )
  }

  /**
   * 倒计时获取手机验证码
   * @returns {XML}
   */
  coutDown () {
    const {formValue: {mobile, captcha}} = this.state
    return (
      <Code mobile={mobile} captcha={captcha}/>
    )
  }

  /**
   * 校验手机验证码
   */
  handleCheckCode = () => {
    let {formValue: {code}} = this.state
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

  submitForm () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('Error', '密码不一致', [{text: 'OK'}])
        return
      }
      if (this.handleCheckCode() == false) {
        Alert.alert('Error', '请输入正确手机验证码', [{text: 'OK'}])
        return
      }
      this.props.changePassword(value.mobile, value.code, value.password)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the changePassword attempt complete?
    if (!newProps.fetching) {
      if (newProps.error) {
        Alert.alert('Error', newProps.error, [{text: 'OK'}])
      } else {
        if (newProps.change) {
          this.setState({
            success: true
          })
          this.props.refreshLogin()
          // Alert.alert('Success', 'Password changed', [{text: 'OK'}])
          NavigationActions.login()
        }
      }
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
      const Mobile = t.refinement(t.Number, function (m) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/  //验证规则
      return reg.test(m) //true
    })
    const state = {
      formModel: t.struct({
        mobile: Mobile,
        password: t.String,
        confirmPassword: t.String,
        captcha: t.String,
        code: t.String
      }),
      formValue: this.state.formValue,
      formOptions: {
        fields: {
          mobile: {
            label: '手机',
            placeholder: '请输入手机号',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            label: '密码',
            secureTextEntry: true,
            placeholder: '请输密码',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: '确认密码',
            secureTextEntry: true,
            placeholder: '请再次确认密码',
            returnKeyType: 'done',
            onSubmitEditing: () => this.refs.form.getComponent('captcha').refs.input.focus()
          },
          captcha: {
            label: '图片验证',
            placeholder: '图片验证',
            template: Custom,
            config: {
              captcha: this.captchaImage
            },
            onSubmitEditing: () => this.refs.form.getComponent('code').refs.input.focus()
          },
          code: {
            label: '验证码',
            placeholder: '验证码',
            template: Custom,
            config: {
              captcha: this.coutDown
            },
            onSubmitEditing: () => this.submitForm()
          }
        }
      }
    }
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref='form'
            type={state.formModel}
            options={state.formOptions}
            value={state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.password.fetching,
    error: state.password.error,
    change: state.password.change,
    codeHash1: state.captchaCode.codeHash1,
    codeHash2: state.captchaCode.codeHash2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (mobile, code, password) => dispatch(PasswordActions.forgotPasswordRequest(mobile, code, password)),
    refreshLogin: () => {
      dispatch(PasswordActions.passInit())
      dispatch(LoginActions.loginLoad())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
