import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import styles from './Styles/NavigationContainerStyles'

import ApplicationStyles from '../Themes/ApplicationStyles'

import CustomNavBar from './CustomNavBar'

import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingsScreen from '../Containers/SettingsScreen'
import ChangePasswordScreen from '../Containers/ChangePasswordScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import MyCenter from '../Containers/MyCenter'

import TabIcon from '../Components/TabIcon'
// ignite-jhipster-navigation-import-needle

/* **************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ***************************/
class NavigationRouter extends Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <Router>
        <Scene key='root' tabs={true} tabBarStyle={styles.tabBarStyle} >
          <Scene key='launchScreen' initial hideNavBar={true}  icon={TabIcon} component={LaunchScreen} title='欢迎'
                 iconName="home"  navigationBarStyle={styles.navBar} titleStyle={styles.title} navBar={CustomNavBar}
                 selectedIconName="home-outline" iconColor={ApplicationStyles.tab.iconColor}
                 textColor={ApplicationStyles.tab.textColor}/>
          <Scene key='ucenter' icon={TabIcon} title='我的' iconName="person" selectedIconName="person-outline"
                 iconColor={ApplicationStyles.tab.iconColor} textColor={ApplicationStyles.tab.textColor}  navigationBarStyle={styles.navBar} titleStyle={styles.title}>
            <Scene key='myCenter' initial component={MyCenter} title='用户中心' />
            <Scene key='setting' component={SettingsScreen} title='设置'/>
            <Scene key='forgotPassword' component={ForgotPasswordScreen} title='忘记密码'/>

            <Scene key='login' component={LoginScreen} title='登录'/>
            <Scene key='register' component={RegisterScreen} title='注册'/>
            <Scene key='changePassword' component={ChangePasswordScreen} title='修改密码'/>
          </Scene>
          {/* ignite-jhipster-navigation-needle */}
        </Scene>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
// export default NavigationRouter
