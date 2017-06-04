import React, { Component } from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Chart from 'react-native-chart';
import * as request from 'superagent';
import Display from 'react-native-display';

export default class StockResult extends Component {

	render() {
		return (
			<View style={styles.wrapper}>
				<Display style={{flex: 1, height: 180, alignItems:'center', justifyContent:'center'}} enable={this.props.searching}>
					<ActivityIndicator animating={this.props.searching} size='large' />
				</Display>
				<Display style={styles.container} enable={!this.props.searching}>
					<View style={styles.top}>
						<Text style={{fontWeight: '600', color: '#505050', fontSize: 16}}>{this.props.name}</Text>
					</View>
					<View style={styles.container}>
						<View style={styles.container}>
							<Chart
								style={styles.chart}
								data={this.props.data}
								type="line"
								verticalGridSteps={7}
								horizontalGridStep={40}
								showDataPoint={true}
								dataPointRadius={0}
								color={'rgb(114, 195, 247)'}
								gridColor={'rgba(0, 0, 0, 0.15)'}
								axisColor={'rgba(0, 0, 0, 0.25)'}
							/>
						</View>
					</View>
				</Display>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		height: 240,
		backgroundColor: '#fff',
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		shadowColor: 'rgba(0, 0, 0, 0.35)',
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1.5
		},
		borderRadius: 5,
		justifyContent: 'center',
   		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	top: {
		padding: 10
	},
	chart: {
		width: 300,
		height: 100
	}
});	