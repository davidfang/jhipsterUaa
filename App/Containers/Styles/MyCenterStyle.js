import { StyleSheet } from 'react-native'
import { Colors, Metrics} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    // backgroundColor: Colors.background
  },
  intro: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 5,
    backgroundColor:Colors.steel,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    flexDirection: 'row',
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
  title: {
    color: Colors.silver
  }
})
