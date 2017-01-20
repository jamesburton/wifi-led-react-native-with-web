/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button
} from 'react-native';

export class App extends Component {
  sendMessage() {
    // NB: This should work on react-native without props, but react-native-for-web appears to differ ... hence the fall-through
    //var id = this.txtId.value;
    //var msg = this.txtMsg.value;
    var id = this.txtId.props ? this.txtId.props.value : this.txtId.value;
    var msg = this.txtMsg.props ? this.txtMsg.props.value : this.txtMsg.value;
    console.log("App.sendMessage: id=", id, ", msg=", msg, ", this.txtId=", this.txtId, ", this.txtMsg=", this.txtMsg);
  }
  constructor() {
    super();
    this.onSendMessage = this.sendMessage.bind(this);
  }
  render() {
    /*
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native for {Platform.OS}!!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.{Platform.OS}.js YA!
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload (Ctrl+r on Windows),{'\n'}
          { Platform.OS !== "web"?"Cmd+D or shake for dev menu":"" }
        </Text>
      </View>
    );
    */
    return <View style={styles.container}>
        <Text style={styles.welcome}>
          WiFi LED Contoller in React Native for {Platform.OS}!!!!
        </Text>
        <Text style={styles.instructions}>
          Please use the controls below to send messages to the selected unit
        </Text>
        <View>
          <View style={styles.row}>
            <Text>WiFi LED ID: </Text>
            <TextInput ref={(id) => this.txtId = id} style={{height: 40, borderColor: 'gray', borderWidth: 1}} value="wifiled:10644262" />
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Text>Send Message: </Text>
            <TextInput ref={(msg) => this.txtMsg = msg} style={{height: 40, borderColor: 'gray', borderWidth: 1}} value="red" />
          </View>
        </View>
        <View>
          { Button
          ? <Button 
            onPress={() => this.onSendMessage()}
            title="Send Message" 
            color="#841584" 
            accessibilityLabel="You're about to press the purple send button" />
          : <Text onPress={this.onSendMessage} style={styles.textButton}>Send Message</Text> }
        </View>
        <Text style={styles.instructions}>
          Press Cmd+R to reload (Ctrl+r on Windows),{'\n'}
          { Platform.OS !== "web"?"Cmd+D or shake for dev menu":"" }
        </Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  textButton: {
    lineHeight: 30,
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#3c3",
    color: "white"
  }
});