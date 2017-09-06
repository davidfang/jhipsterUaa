import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

import DrawerButton from '../Components/DrawerButton'

import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
// Styles
import styles from './Styles/MyCenterStyle'

class MyCenter extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }
  ucenter () {
    if (this.props.loggedIn) {
      return (<Scene key='ucenter' title='我的'>
        <Scene key='settings' component={SettingsScreen} title='设置'/>
        <Scene key='forgotPassword' component={ForgotPasswordScreen} title='忘记密码'/>
      </Scene>)
    } else {
      return (<Scene key='ucenter' title='我的'>
        <Scene key='login' component={LoginScreen} title='登录'/>
        <Scene key='register' component={RegisterScreen} title='注册'/>
        <Scene key='changePassword' component={ChangePasswordScreen} title='修改密码'/>
      </Scene>)
    }
  }

  handlePressLogin = () => {
    NavigationActions.login()
  }
  handlePressRegister = () => {
    NavigationActions.register()
  }
  handlePressForgotPassword = () => {
    NavigationActions.forgotPassword()
  }
  handlePressSettings = () => {
    NavigationActions.settings()
  }
  handlePressChangePassword = () => {
    NavigationActions.changePassword()
  }
  handlePressLogout = () => {
    this.props.logout()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {!this.props.loggedIn && (<DrawerButton text='登录' onPress={this.handlePressLogin}/>)}
        {!this.props.loggedIn && (<DrawerButton text='注册' onPress={this.handlePressRegister}/>)}
        {!this.props.loggedIn && (<DrawerButton text='忘记密码' onPress={this.handlePressForgotPassword}/>)}

        {this.props.loggedIn && (<DrawerButton text='设置' onPress={this.handlePressSettings}/>)}
        {this.props.loggedIn && (<DrawerButton text='修改密码' onPress={this.handlePressChangePassword}/>)}
        {this.props.loggedIn && (<DrawerButton text='退出' onPress={this.handlePressLogout}/>)}
        <Text>MyCenter Container 已登录</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.login)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCenter)
