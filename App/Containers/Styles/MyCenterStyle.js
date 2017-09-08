import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.steel
  },
  intro: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 5,
    backgroundColor: Colors.steel,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  introLeft: {
    flex: 2,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  introRight: {
    flex: 8,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20
  },
  rowItemGroup: {
    marginTop: Metrics.baseMargin,
    // marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.silver
  },
  title: {
    color: Colors.silver
  }
})
