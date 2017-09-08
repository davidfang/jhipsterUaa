import React from 'react'
import { ScrollView, Text, View, Platform,TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

import DrawerButton from '../Components/DrawerButton'
import FullButton from '../Components/FullButton'
import RoundedButton from '../Components/RoundedButton'
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

  userHead = () => {
    const {loggedIn, username, avatar} = this.props
    if (loggedIn) {
      return (
        <View style={styles.intro}>
          <View style={styles.introLeft}>
            <Avatar width={50} name={username} avatar={avatar}/>
          </View>
          <TouchableOpacity style={styles.introRight} onPress={() => NavigationActions.setting()}>
            <Text style={Fonts.style.h3}>{username}</Text>
            {Platform.OS === 'ios' ? <Icon name="ios-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }
            {Platform.OS === 'android' ? <Icon name="md-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.intro}>
          <FullButton text={'登录'} onPress={() => NavigationActions.login()}/>
          <FullButton text={'注册'} onPress={() => NavigationActions.register()}/>
        </View>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.userHead()}
        {this.props.loggedIn && (
          <View style={styles.rowItemGroup}>
            <RowItem title="修改密码" icon="md-key" iconColor='lightskyblue'
                     onPress={() => NavigationActions.changePassword()  }/>

          </View>)
        }
        <View style={styles.rowItemGroup}>
          <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor='lightskyblue'/>
          <RowItem title="主题颜色" icon="ios-color-palette" iconColor={Colors.fire}/>

        </View>

        <View style={styles.rowItemGroup}>
          <RowItem title="反馈" icon="md-text" iconColor='lightskyblue'/>
          <RowItem title="分享" icon="md-share" iconColor={Colors.fire}/>

        </View>
        <View/>
        {this.props.loggedIn && (<RoundedButton text={'退出'} onPress={() => this.props.logout()}/>)}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {username, avatar} = state.account
  return {
    loggedIn: isLoggedIn(state.login),
    username,
    avatar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCenter)
