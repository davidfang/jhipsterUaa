import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  cameraBtn: {
    padding: 5
  },
  count: {
    color: '#fff',
    fontSize: 12
  },
  fullBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  countBox: {
    position: 'absolute',
    right: -5,
    top: -5,
    alignItems: 'center',
    backgroundColor: '#34A853',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center'
  }
})
