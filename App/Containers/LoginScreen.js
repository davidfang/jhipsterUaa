import React, { PropTypes } from 'react'
import { Alert, Image, View, ScrollView, Text, TextInput, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginScreenStyles'
import { Images, Metrics } from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

class LoginScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  isAttempting = false

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', '用户名密码错误', [{text: 'OK'}])
        }
      } else {
        NavigationActions.launchScreen()
      }
    }
  }

  handlePressLogin = () => {
    const {username, password} = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    this.props.attemptLogin(username, password)
  }
  handlePressCancel = () => {
    this.props.logout()
    NavigationActions.pop()
  }

  handleChangeUsername = (text) => {
    this.setState({username: text})
  }

  handleChangePassword = (text) => {
    this.setState({password: text})
  }

  render () {
    const {username, password} = this.state
    const {fetching} = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}}
                  style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logoLogin} style={[styles.topLogo, this.state.topLogo]}/>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>用户名</Text>
            <TextInput
              ref='username'
              style={textInputStyle}
              value={username}
              editable={editable}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='用户名'/>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>密码</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='密码'/>
          </View>

          <TouchableHighlight style={styles.button} onPress={this.handlePressLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>登录</Text>
          </TouchableHighlight>


        </View>

        <View style={styles.viewWrap}>
          <View style={styles.textWrap}>
            <Button bordered title='忘记密码' onPress={() => NavigationActions.forgotPassword()}>忘记密码?</Button>
            <Button bordered title='注册新帐户' onPress={() => NavigationActions.register()}>注册新账户</Button>
          </View>
        </View>


      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
