import {Metrics,ApplicationStyles, Colors} from '../../Themes/'

export default {
  container: {
    flex: 1
  },
  navBar: {
    ...ApplicationStyles.navBar
  },
  title: {
    color: Colors.snow
  },
  leftButton: {
    tintColor: Colors.snow
  },
  rightButton: {
    color: Colors.snow
  },
  tabBarStyle: {
    //borderWidth : .5,
    backgroundColor: ApplicationStyles.tabBar.backgroundColor,
    opacity        : 1,
    height         : ApplicationStyles.tabBar.height
  }
}
