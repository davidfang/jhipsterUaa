import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import AccountActions from '../Redux/AccountRedux'
import JHIPSTER_API from '../Services/JhipsterApi'
const jhipsterApi = JHIPSTER_API.create()
// Styles
import styles from './Styles/PhotoStyle'

import CameraButton from '../Components/CameraButton'

class PhotoScreen extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>Photo Container</Text>
        <CameraButton style={styles.cameraBtn}
                      photos={[]}
                      onFileUpload={this.onFileUpload}/>
      </ScrollView>
    )
  }

  onFileUpload  (fileUrl, fileName) {
    return this.props.uploadAvatar( fileUrl, fileName)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadAvatar: (fileUrl, fileName) => dispatch(AccountActions.uploadAvatarRequest(fileUrl, fileName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen)
