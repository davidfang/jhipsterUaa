import { StyleSheet } from 'react-native'
import { Metrics,Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.baseMargin,
    alignItems: 'center'
  },
  tabDefaut: {
    color: Colors.text
  },
  tabSelect: {
    color: Colors.bloodOrange
  }
})
