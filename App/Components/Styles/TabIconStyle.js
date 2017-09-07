import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    alignItems: 'center',
    height: 15,
    color: Colors.snow
  },
  tabDefaut: {
    color: Colors.text
  },
  tabSelect: {
    color: Colors.bloodOrange
  }
})
