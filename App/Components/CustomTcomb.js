/**
 * Created by admin on 17/8/9.
 */
import React from 'react'
import { Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import CountDownButton from './CountDownButton'

export function CountDown (locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  var controlLabelStyle = stylesheet.controlLabel.normal
  var textboxStyle = stylesheet.textbox.normal
  var textboxViewStyle = stylesheet.textboxView.normal
  var helpBlockStyle = stylesheet.helpBlock.normal
  var errorBlockStyle = stylesheet.errorBlock

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    controlLabelStyle = stylesheet.controlLabel.error
    textboxStyle = stylesheet.textbox.error
    textboxViewStyle = stylesheet.textboxView.error
    helpBlockStyle = stylesheet.helpBlock.error
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable
    textboxViewStyle = stylesheet.textboxView.notEditable
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null
  var error = locals.hasError && locals.error ?
    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null

  return (<View style={formGroupStyle}>
    {label}
    <View style={[textboxViewStyle, {flexDirection: 'row'}]}>
      <TextInput
        accessibilityLabel={locals.label}
        ref="input"
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={locals.placeholderTextColor}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={(value) => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        style={[textboxStyle, {flex: 2}]}
        value={locals.value}
      />
      <CountDownButton frameStyle={{right: 5, marginLeft: 15, flex: 1.5, height: 36}}
                       beginText='获取验证码'
                       endText='再次获取验证码'
                       count={10}
                       pressAction={() => {this.countDownButton.startCountDown()}}
                       changeWithCount={(count) => count + 's后重新获取'}
                       id='register'
                       ref={(e) => {this.countDownButton = e}}
      />
    </View>
    {help}
    {error}
  </View>)
}
/**
 * 验证控件 调用时加上{config:{captcha:captchaFunc}}
 * @param locals
 * @returns {*}
 * @constructor
 */
export function Captcha (locals) {
  if (locals.hidden) {
    return null
  }

  var stylesheet = locals.stylesheet
  var formGroupStyle = stylesheet.formGroup.normal
  var controlLabelStyle = stylesheet.controlLabel.normal
  var textboxStyle = stylesheet.textbox.normal
  var textboxViewStyle = stylesheet.textboxView.normal
  var helpBlockStyle = stylesheet.helpBlock.normal
  var errorBlockStyle = stylesheet.errorBlock

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error
    controlLabelStyle = stylesheet.controlLabel.error
    textboxStyle = stylesheet.textbox.error
    textboxViewStyle = stylesheet.textboxView.error
    helpBlockStyle = stylesheet.helpBlock.error
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable
    textboxViewStyle = stylesheet.textboxView.notEditable
  }

  var label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null
  var help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null
  var error = locals.hasError && locals.error ?
    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null

  return (<View style={formGroupStyle}>
    {label}
    <View style={[textboxViewStyle, {flexDirection: 'row'}]}>
      <TextInput
        accessibilityLabel={locals.label}
        ref="input"
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={locals.placeholderTextColor}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={(value) => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        style={[textboxStyle, {flex: 2}]}
        value={locals.value}
      />
      {locals.config.captcha()}
    </View>
    {help}
    {error}
  </View>)
}

