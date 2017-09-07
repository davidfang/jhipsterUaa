import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AvatarStyle'

export default class Avatar extends React.Component {

  render () {
    const {width, name, backgroundColor} = this.props
    return (
      <View style={[{width: width, height: width, borderRadius: width / 2, backgroundColor}, styles.container]}>
        <Text>{name}</Text>
      </View>
    )
  }
}

// Prop type warnings
Avatar.propTypes = {
  width: React.PropTypes.number,
  name: React.PropTypes.string,
  backgroundColor: React.PropTypes.string
}

// Defaults for props
Avatar.defaultProps = {
  width: 60,
  backgroundColor: 'skyblue'
}
