import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as request from 'superagent';
import StockResult from './StockResult';

export default class DefaultStocks extends Component {

	constructor(props) {
		super(props);

		this.state = {companies: []};
	}

	updateData(data) {
		this.setState({companies: data});
	}

	componentWillMount() {
		var data = [];
		var foo = this.updateData.bind(this);
		var y = 0;

		while (y < this.props.defaults.length) {
			var name = this.props.defaults[y];

			let a = y;

			request.get('http://104.236.214.139/getinfo/' + this.props.defaults[y])
				.set('Accept', 'application/json')
				.end((function(err, res) {
					if (err) {
						console.log(err);
					} else {
						var x = 0;
						var d = [];
						var od = [];

						while (res.body.Previous.length > x && x < 365) {
			              od.push([x, res.body.Previous[x]]);
			              x++
			            }

			            x = 0;

						while (res.body.Predictions.length > x && x < 31) {
							d.push([x, res.body.Predictions[x]]);
							x++;
						}

						data.push([d, od, this.props.defaults[a]]);
					}	

					foo(data);
				}.bind(this)));

			y++;
		}
	}

	render() {
		var companies = this.state.companies.map((el) =>
				<StockResult searching={false} data={el[0]} olddata={el[1]} name={el[2]} />
			)

		return(<View>{companies}</View>);
	}

}