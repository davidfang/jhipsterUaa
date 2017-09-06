import React from 'react'
import { ScrollView, Text, Image, View, TouchableHighlight } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logoJhipster} style={styles.logo}/>
          </View>

          <View style={styles.section}>
            <Image source={Images.ready}/>
            <Text style={styles.sectionText}>
              {'This is where you\'ll see a live preview of your fully functioning app using Ignite.'}
            </Text>
          </View>
          <DevscreensButton />
        </ScrollView>
      </View>
    )
  }
}
