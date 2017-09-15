import React from 'react'
import { ScrollView, Text, View, Platform,TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
import ImagePicker from 'react-native-image-picker'

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
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Avatar width={50} name={username} avatar={avatar}/>
            </TouchableOpacity>
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
  selectPhotoTapped () {
    const options = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图片库',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 600,
      maxHeight: 600,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source = {uri: response.uri}

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.props.uploadAvatar(response.uri, response.fileName)
        /*this.setState({
          avatarSource: source
        })*/
      }
    })
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
    logout: () => dispatch(LoginActions.logoutRequest()),
    uploadAvatar: (fileUrl, fileName) => dispatch(AccountActions.uploadAvatarRequest(fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCenter)
