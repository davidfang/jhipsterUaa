import React from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RegisterActions from '../Redux/RegisterRedux'
import PasswordActions from '../Redux/PasswordRedux'
import LoginActions from '../Redux/LoginRedux'
import t from 'tcomb-form-native'
import { Captcha as Custom } from '../Components/CustomTcomb'
import Captcha from './Captcha'
import Code from './Code'
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
        code: null
      },
      success: false
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
    this.handleCheckCode = this.handleCheckCode.bind(this)
    this.captchaImage = this.captchaImage.bind(this)
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
    const {accountValue: {mobile, captcha}} = this.state
    return (
      <Code mobile={mobile} captcha={captcha}/>
    )
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
      if (this.handleCheckCode() == false) {
        Alert.alert('Error', '请输入正确手机验证码', [{text: 'OK'}])
        return
      }

      this.props.register({...value,username: value.mobile, type: 'miliao'})
    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    if(newProps.authToken != null){
      NavigationActions.pop()
    }
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

  render () {
    const Mobile = t.refinement(t.Number, function (m) {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/  //验证规则
      return reg.test(m) //true
    })
    const state = {
      accountModel: t.struct({
        mobile: Mobile,
        password: t.String,
        confirmPassword: t.String,
        captcha: t.String,
        code: t.String
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
            onSubmitEditing: () => this.submitUpdate()
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
  return {
    fetching: state.register.fetching,
    error: state.register.error,
    authToken:state.login.authToken,
    codeHash1: state.captchaCode.codeHash1,
    codeHash2: state.captchaCode.codeHash2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (account) => dispatch(RegisterActions.registerRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
