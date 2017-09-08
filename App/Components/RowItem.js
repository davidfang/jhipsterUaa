import React from 'react'
import { View, Text, Platform, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './Styles/RowItemStyle'
import { Metrics, Fonts, Colors } from '../Themes'
export default class RowItem extends React.Component {

  render () {
    const {title, icon, iconColor} = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.left}>
          <Icon name={icon} color={iconColor} size={32}/>
        </View>
        <View style={styles.right}>
          <View style={{paddingBottom: 10, paddingTop: 10}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            {Platform.OS === 'ios' ? <Icon name="ios-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }
            {Platform.OS === 'android' ? <Icon name="md-arrow-forward" color={Colors.charcoal} size={18}/>
              : null
            }

          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

// Prop type warnings
RowItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
  iconColor: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func
}

// Defaults for props
RowItem.defaultProps = {
  title: '#D8D8D8',
  icon: 'md-reorder',
  iconColor: '#fb5f26'
}
