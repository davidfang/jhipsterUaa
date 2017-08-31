import React from 'react'
import {
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
 import CaptchaCodeActions from '../Redux/CaptchaCodeRedux'

// Styles
import styles from './Styles/CaptchaStyle'

import AppConfig from '../Config/AppConfig'

class Captcha extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  componentWillMount () {
    this.handleRefreshCaptcha()
  }

  /**
   * 刷新验证码
   */
  handleRefreshCaptcha = () => {
    this.props.getCaptcha()
  }

  render () {
    const {captchaUrl} = this.props
    const {apiUrl} = AppConfig
    return (
      <TouchableOpacity onPress={this.handleRefreshCaptcha}>
        <Image source={{uri: apiUrl + captchaUrl}}
               style={{width: 120, height: 40}}/>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  const {captchaCode: {fetching,
    error,
    captchaUrl,
    captchaHash1,
    captchaHash2,
    captcha}} = state
  return {
    fetching: fetching,
    error: error,
    captchaUrl,
    captchaHash1,
    captchaHash2,
    captcha
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCaptcha: () => dispatch(CaptchaCodeActions.captchaRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Captcha)
