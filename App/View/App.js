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
import mqtt from 'mqtt';
import url from 'url';

var client;

export class App extends Component {
  sendMessage() {
    // NB: This should work on react-native without props, but react-native-for-web appears to differ ... hence the fall-through
    //var id = this.txtId.value;
    //var msg = this.txtMsg.value;
    var id = this.txtId.refs.input ? this.txtId.refs.input.value : this.txtId.value;
    var msg = this.txtMsg.refs.input ? this.txtMsg.refs.input.value : this.txtMsg.value;
    console.log("App.sendMessage: id=", id, ", msg=", msg, ", this.txtId=", this.txtId, ", this.txtMsg=", this.txtMsg);
    //////
    this.client.publish('/' + id, msg, function() {
      console.log("Message is published @", id, ", msg=", msg);
      //client.end(); // Close the connection when published
    });
  }
  constructor() {
    super();
    this.onSendMessage = this.sendMessage.bind(this);
  }
  componentDidMount() {
    console.log('App:componentDidMount()');
    this.client = initMQTT();
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
            <TextInput ref={(id) => this.txtId = id} style={{height: 40, borderColor: 'gray', borderWidth: 1}} defaultValue="wifiled:10644262" />
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Text>Send Message: </Text>
            <TextInput ref={(msg) => this.txtMsg = msg} style={{height: 40, borderColor: 'gray', borderWidth: 1}} defaultValue="red" />
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

function initMQTT()
{
  //var defaultMqttUrl = 'mqtt://localhost:1883';
  //var defaultMqttUrl = 'mqtt://oyeypfqd:H4T1oWKApitM@m20.cloudmqtt.com:32773';
  //var defaultMqttUrl = 'mqtt://react-native-app:R3actNat1v3App@m20.cloudmqtt.com:32773';
  //var defaultMqttUrl = 'mqtt://test.mosquitto.org';

  //var defaultMqttUrl = 'ws://test.mosquitto.org:8080';  // NB: Works!
  //var defaultMqttUrl = "ws://react-native-app:R3actNat1v3App@m20.cloudmqtt.com:32773";
  //var defaultMqttUrl = "mqtt://react-native-app:R3actNat1v3App@m20.cloudmqtt.com:12773";
  var defaultMqttUrl = "wss://oyeypfqd:H4T1oWKApitM@m20.cloudmqtt.com:32773";
  // Parse 
  var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || defaultMqttUrl);
  var auth = (mqtt_url.auth || ':').split(':');
  //var connectionString = "mqtt://" + mqtt_url.host;
  //var connectionString = "wss://" + mqtt_url.host;
  var connectionString = mqtt_url.protocol + "//" + mqtt_url.host;

  var options = {
    port: parseInt(mqtt_url.port || "80"),
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: auth[0],
    password: auth[1],
    useTLS: true
  };

  //*
  console.log("mqtt options=", options, ", connectionString=", connectionString);
  // Create a client connection
  var client = mqtt.connect(connectionString, options);

  //var client = mqtt.connect("mqtt://react-native-app:R3actNat1v3App@m20.cloudmqtt.com:32773");
  //var client = mqtt.connect("ws://react-native-app:R3actNat1v3App@m20.cloudmqtt.com:32773");
  //var client = mqtt.connect('mqtt://test.mosquitto.org')
  //var client = mqtt.createClient(32773, "m20.cloudmqtt.com", { username: "react-native-app", password: "R3actNat1v3App" });

  client.on('connect', function() { // When connected

    // subscribe to a topic
    client.subscribe('hello/world', function() {
      // when a message arrives, do something with it
      client.on('message', function(topic, message, packet) {
        console.log("Received '" + message + "' on '" + topic + "'");
      });
    });

    // publish a message to a topic
    client.publish('hello/world', 'my message', function() {
      console.log("Message is published");
      //client.end(); // Close the connection when published
    });
  });
  return client;
  //*/

  /*
  client = new Paho.MQTT.Client(mqtt_url.host, mqtt_url.port, options.clientId);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({onSuccess:onConnect});


  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("World");
    message = new Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    client.send(message);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
  }

  return client;
  //*/
}