/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableHighlight, NativeModules } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      response: '',
      error: ''
    };
  }

  _onPressSeach = () => {
    NativeModules.IEX.fetchDetails(this.state.text)
      .then(response => {
        this.setState({error : ''})
        this.setState({response})
      })
      .catch((error) => {
        this.setState({response : ''})
        this.setState({ error})
      });
  }

  renderResult(){
    if(this.state.response){
      let obj = JSON.parse(this.state.response);
      return(
        <View style={styles.result}>
          <View style={styles.text_container}>
            <Text>Company Name:</Text>
            <Text>Company Website:</Text>
            <Text>CEO:</Text>
            <Text>Current stock value:</Text>          
          </View>
          <View style={styles.text_container}>
            <Text>{obj.companyName}</Text>
            <Text>{obj.website}</Text>
            <Text>{obj.CEO}</Text>
            <Text>{obj.price}</Text>
          </View>
        </View>
      )
    } else if(this.state.error){
      return(
        <View>
          <Text>No stock found for {this.state.text}</Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search_container}>
          <TextInput
            placeholder='Search symbol'
            style={{height: 40, flex: 1, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableHighlight onPress={this._onPressSeach}>
            <Image
              style={{width: 40, height: 40, padding: 10}}
              source={require('./images/search.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.result}>
          {this.renderResult()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  search_container: {
    flex: 0.1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  result: {
    flex: 0.9,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text_container:{
    flex: 1,
    justifyContent: 'flex-start',
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
});
