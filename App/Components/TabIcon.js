import React from 'react'
import { View, Text, Platform, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './Styles/TabIconStyle'

export default class TabIcon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      iconName: props.iconName,
      selectedIconName: props.selectedIconName
    }
  }

  componentWillMount () {

    const {iconColor} = this.props
    // const normalColor = Colors.fire
    if (Platform.OS === 'ios') {
      Icon.getImageSource('ios-' + this.props.iconName, 100, iconColor).then((source) => this.setState({iconName: source}))
      Icon.getImageSource('ios-' + this.props.selectedIconName, 100, iconColor).then((source) => this.setState({selectedIconName: source}))
    } else if (Platform.OS === 'android') {
      Icon.getImageSource('md-' + this.props.iconName, 100, iconColor).then((source) => this.setState({iconName: source}))
      Icon.getImageSource('md-' + this.props.selectedIconName, 100, iconColor).then((source) => this.setState({selectedIconName: source}))
    }
  }

  render () {
    const img = this.props.selected ? (<Image source={this.state.iconName} style={{width: 20, height: 20}}/>) : (
      <Image source={this.state.selectedIconName} style={{width: 20, height: 20}}/>)

    return (
      <View style={styles.container}>
        {img}
        <Text style={{color:this.props.textColor}}>{this.props.title}</Text>
      </View>
    )
  }
}

// Prop type warnings
TabIcon.propTypes = {
  iconName: React.PropTypes.string.isRequired,
  selectedIconName: React.PropTypes.string.isRequired,
  iconColor: React.PropTypes.string.isRequired,
  textColor: React.PropTypes.string.isRequired
}

// Defaults for props
TabIcon.defaultProps = {
  iconName: 'home',
  selectedIconName: 'home-outline',
  iconColor: '#F7F7F7',
  textColor: '#F7F7F7'
}
