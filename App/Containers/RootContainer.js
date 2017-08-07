import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import LoginActions from '../Redux/LoginRedux'
import AccountActions from '../Redux/AccountRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      authTimeout: null
    }
    this.renewAuthWhenNeeded = this.renewAuthWhenNeeded.bind(this)
  }
  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.rehydrationComplete && !this.props.login) {
      this.props.loadLogin()
    }
    if (newProps.login && newProps.rehydrationComplete) {
      if (newProps.login.hasOwnProperty('refresh_token') && !this.state.authTimeout) {
        this.renewAuthWhenNeeded()
      }
    }
    if (!newProps.login) {
      clearTimeout(this.state.authTimeout)
      this.setState({ authTimeout: null })
    }
  }

  renewAuthWhenNeeded () {
    clearTimeout(this.state.authTimeout)
    // refreshes the token 10 seconds before it expires.
    let timeout = this.props.login ? this.props.login.expires_in * 1000 - 10000 : 10000
    let authTimeout = setTimeout(() => {
      this.props.refreshLogin(this.props.login.refresh_token)
      this.renewAuthWhenNeeded()
    }, timeout)
    this.setState({ authTimeout: authTimeout })
  }
  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rehydrationComplete: state.appState.rehydrationComplete,
    login: state.login.authToken
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  loadLogin: () => dispatch(LoginActions.loginLoad()),
  refreshLogin: (refreshToken) => dispatch(LoginActions.loginRefresh(refreshToken)),
  getAccount: () => dispatch(AccountActions.accountRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
