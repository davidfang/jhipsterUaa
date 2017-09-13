import React from 'react'
import { Alert, ScrollView, Text, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import JHIPSTER_API from '../Services/JhipsterApi'

import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import AppSetActions from '../Redux/AppSetRedux'

import t from 'tcomb-form-native'
// Styles
import styles from './Styles/SettingsScreenStyle'

let Form = t.form.Form
const jhipsterApi = JHIPSTER_API.create()

class SettingsScreen extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      province: this.props.province,
      city: this.props.city,
      area: this.props.area,
      accountValue: this.props.account,
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
      this.props.updateProfile(value)
      NavigationActions.pop()
      if (this.state.city != this.props.city) {
        this.props.appSetPrivince(this.state.accountValue.province)
      }
      if (this.state.area != this.props.area) {
        this.props.appSetPrivince(this.state.accountValue.city)
      }
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
      }
    }
  }

  componentWillMount () {
    if (!this.state.province.hasOwnProperty(this.state.accountValue.province)) {
      this.props.appSetPrivince(0)
    }
    if (this.state.accountValue.province != '' && !this.state.city.hasOwnProperty(this.state.accountValue.city)) {
      this.props.appSetPrivince(this.state.accountValue.province)
    }
    if (this.state.accountValue.city != '' && !this.state.area.hasOwnProperty(this.state.accountValue.area)) {
      this.props.appSetPrivince(this.state.accountValue.city)
    }
  }

  accountChange (newValue) {
    if (newValue.province != this.state.accountValue.province) {
      newValue.city = ''
      newValue.area = ''
      jhipsterApi.getProvince(newValue.province)
        .then((response) => response.data)
        .then(data => {
          const Data = data.data

          const d = {}
          for (let v of Data) {
            d[v.code] = v.name
          }
          this.setState({city: d, area: {}, accountValue: newValue})
          return
        })
    }
    if (newValue.city != this.state.accountValue.city) {
      newValue.area = ''
      jhipsterApi.getProvince(newValue.city)
        .then((response) => response.data)
        .then(data => {
          const Data = data.data

          const d = {}
          for (let v of Data) {
            d[v.code] = v.name
          }
          this.setState({area: d, accountValue: newValue})
          return
        })
    }
  }

  render () {
    const state = {
      accountModel: t.struct({
        province: t.enums(this.state.province),
        city: t.enums(this.state.city),
        area: t.enums(this.state.area),
        gender: t.enums({
          1: '男',
          2: '女'
        })
      }),
      accountValue: this.state.accountValue,
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
      }
    }
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Form
            ref='form'
            type={state.accountModel}
            options={state.options}
            value={state.accountValue}
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
  const {province, city, area} = state.appSet
  return {
    province, city, area,
    account: state.account.profile,
    updating: state.account.updating,
    error: state.account.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile) => dispatch(AccountActions.profileUpdateRequest(profile)),
    appSetPrivince: (parentId) => dispatch(AppSetActions.provinceRequest(parentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
