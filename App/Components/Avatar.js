import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/AvatarStyle'

export default class Avatar extends React.Component {

  render () {
    const {width, name, backgroundColor, avatar} = this.props
    if (avatar) {
      return (
        <Image source={{uri: avatar}}
               style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}/>
      )
    } else {
      return (
        <View style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}>
          <Text>{name}</Text>
        </View>
      )
    }
  }
}

// Prop type warnings
Avatar.propTypes = {
  width: React.PropTypes.number,
  name: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  avatar: React.PropTypes.string
}

// Defaults for props
Avatar.defaultProps = {
  width: 60,
  backgroundColor: 'skyblue'
}
