import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/TabIconStyle'

export default class TabIcon extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={this.props.selected ? styles.tabSelect : styles.tabDefaut}>{this.props.title}</Text>
      </View>
    )
  }
}

// // Prop type warnings
// TabIcon.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// TabIcon.defaultProps = {
//   someSetting: false
// }
