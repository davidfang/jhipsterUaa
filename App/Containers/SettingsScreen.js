import React from 'react'
import { Alert, ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import t from 'tcomb-form-native'
// Styles
import styles from './Styles/SettingsScreenStyle'

let Form = t.form.Form

class SettingsScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      accountModel: t.struct({
        province: t.String,
        city: t.String,
        area: t.String,
        gender: t.Boolean
      }),
      accountValue: this.props.account,
      options: {
        fields: {
          province: {
            label: '省',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('city').refs.input.focus()
          },
          city: {
            label: '市',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('area').refs.input.focus()
          },
          area: {
            label: '区',
            returnKeyType: 'done',
            onSubmitEditing: () => this.refs.form.getComponent('gender').refs.input.focus()
          },
          gender: {
            label: '性别',
            onSubmitEditing: () => this.submitUpdate()
          }
        }
      },
      success: false
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  submitUpdate () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      this.props.updateAccount(value)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the update attempt complete?
    if (!newProps.updating) {
      if (newProps.error) {
        if (newProps.error === 'WRONG') {
          Alert.alert('Error', 'Something went wrong while saving the settings', [{text: 'OK'}])
        }
      } else {
        this.setState({
          success: true
        })
        Alert.alert('Success', 'Settings updated', [{text: 'OK'}])
      }
    }
  }

  accountChange (newValue) {
    this.setState({
      accountValue: newValue
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref='form'
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
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
    account: state.account.account.profile,
    updating: state.account.updating,
    error: state.account.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
