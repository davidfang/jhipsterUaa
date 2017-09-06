import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.jhipsterBlue
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    fontSize: 18,
    color: Colors.charcoal
  },
  textInput: {
    marginLeft: Metrics.baseMargin,
    flex: 1,
    height: 40,
    color: Colors.coal,
    borderColor: Colors.steel,
    borderWidth: .5
  },
  textInputReadonly: {
    flex: 1,
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: Colors.jhipsterBlue,
    borderColor: Colors.jhipsterBlue,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  viewWrap: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
})
