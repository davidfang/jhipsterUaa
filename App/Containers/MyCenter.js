import React from 'react'
import { ScrollView, Text, View, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

import DrawerButton from '../Components/DrawerButton'
import Avatar from '../Components/Avatar'
import RowItem from '../Components/RowItem'

import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
// Styles
import styles from './Styles/MyCenterStyle'
import { Metrics, Fonts, Colors } from '../Themes'

class MyCenter extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

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
        <View style={styles.intro}>
          <View style={styles.introLeft}>
            <Avatar width={50} name='张三'/>
          </View>
          <View style={styles.introRight}>
            <Text style={Fonts.style.h3}>张三</Text>
            {Platform.OS === 'ios' ? <Icon name="ios-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }
            {Platform.OS === 'android' ? <Icon name="md-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }
          </View>
        </View>
        <View style={{marginTop: Metrics.baseMargin, marginBottom: Metrics.baseMargin}}>
          <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor='lightskyblue'/>
          <RowItem title="主题颜色" icon="ios-color-palette" iconColor={Colors.fire}/>

        </View>
        <View/>
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
