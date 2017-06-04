/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView, TextInput, Button, Text } from 'react-native';
import StockResult from './app/Components/StockResult';
import * as request from 'superagent';
import DefaultStocks from './app/Components/DefaultStocks';

var defaults = [
  'GOOGL',
  'AAPL',
  'FB',
  'SNAP',
  'TSLA',
  'AMZN',
  'SBUX'
];

export default class hackmann extends Component {

  constructor(props) {
    super(props);
    this.state = {data: [[0, 0]], olddata: [[0, 0]], search: '', currentSearch: '', searching: false}

    this.onChangeText = this.onChangeText.bind(this);
  }

  setData(data, old) {
    this.setState({data: data, olddata: old});
    this.setState({currentSearch: this.state.search});
  }

  onChangeText(text) {
    this.setState({search: text});
  }

  setSearch() {
    this.setState({searching: false});
  }

  fetchNewData() {
    var data = [];
    var olddata = [];
    foo = this.setData.bind(this)
    setsearching = this.setSearch.bind(this)

    if (this.state.searching == false) {
      this.setState({searching: true});

      request.get('http://104.236.214.139/getinfo/' + this.state.search)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) {
            
          } else {
            var x = 0;

            while (res.body.Previous.length > x && x < 365) {
              olddata.push([x, res.body.Previous[x]]);
              x++
            }

            x = 0;

            while (res.body.Predictions.length > x && x < 31) {
              data.push([x, res.body.Predictions[x]]);
              x++;
            }

            foo(data, olddata);
            setsearching();
          }
        });
    } else {

    }
  }

  searchNewStuff() {
    this.fetchNewData();
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  componentWillMount() {
      //this.fetchNewData();
  }

  render() {
     return (
      <View style={{flex: 1, backgroundColor: '#F5FCFF', position: 'relative'}}>
        <ScrollView ref='_scrollView' style={styles.container}>
          <Text style={styles.separator}>Search Results</Text>
          <View>
            <StockResult searching={this.state.searching} data={this.state.data} olddata={this.state.olddata} name={this.state.currentSearch} />
          </View>
          <Text style={styles.separator}>Popular Stocks</Text>
          <View style={{paddingBottom: 20}}>
            <DefaultStocks defaults={defaults}/>
          </View>
        </ScrollView>
        <View style={styles.nav}>
          <View style={styles.top}>
            <TextInput onChangeText={this.onChangeText} placeholder='Search Here' style={styles.input} value={this.state.search}/> 
            <Button style={styles.button} title='Search' onPress={this.searchNewStuff.bind(this)} />
          </View>
          <View style={styles.bottom} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 110
  },
  nav: {
    height: 110,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1.5
    },
    paddingTop: 25,
    position: 'absolute',
    right: 0,
    left: 0
  },
  top: {
    height: 40,
    flex: 1,
    position: 'relative',
    paddingBottom: 35,
    flexWrap: 'wrap',

  },
  separator: {
    textAlign: 'center',
    margin: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#505050'
  },
  button: {
    width: 80,
    height: 40
  },
  input: {
    width: 220,
    height: 40,
    paddingLeft: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 5,
    color: '#505050'
  },
  bottom: {
    flex: 1,
    height: 40
  }
});

AppRegistry.registerComponent('hackmann', () => hackmann);