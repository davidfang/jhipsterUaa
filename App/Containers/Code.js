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
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CaptchaCodeActions from '../Redux/CaptchaCodeRedux'

import CountDownButton from '../Components/CountDownButton'
// Styles
import styles from './Styles/CodeStyle'

class Code extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
    this.countDownPress = this.countDownPress.bind(this)
  }
  /**
   * 倒计时按钮 按下 触发动作
   */
  countDownPress () {
    let {mobile, captcha} = this.props
    if (mobile.length < 11) {
      Alert.alert('Error', '手机格式不对', [{text: 'OK'}])
      return false
    }

    if (this.handleCheckCaptcha(captcha)) {
      this.props.getCode(mobile, captcha)
      this.countDownButton.startCountDown()
      // Alert.alert('发送成功', '手机验证码3分钟内会发放', [{text: 'OK'}])
    } else {
      Alert.alert('Error', '请核对图形验证码', [{text: 'OK'}])
    }

  }
  /**
   * 校验图形验证码
   */
  handleCheckCaptcha = (captcha) => {
    const {hash1, hash2} = this.props
    if (captcha == '' || captcha == null) {
      return false
    }
    captcha = captcha.toLowerCase()
    let a = 0
    for (let i = 0; i < captcha.length; i++) {
      a += captcha.charAt(i).charCodeAt()
    }
    if (a == hash1 || a == hash2) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <CountDownButton frameStyle={{right: 5, marginLeft: 15, flex: 1.5, height: 36}}
                       beginText='获取验证码'
                       endText='再次获取验证码'
                       count={10}
                       pressAction={ this.countDownPress}
                       changeWithCount={(count) => count + 's后重新获取'}
                       id='register'
                       ref={(e) => {this.countDownButton = e}}
      />)
  }
}

const mapStateToProps = (state) => {
  const {hash1, hash2} = state.captchaCode
  return {
  hash1, hash2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCode: (mobile, captcha) => dispatch(CaptchaCodeActions.codeRequest(mobile, captcha)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Code)
