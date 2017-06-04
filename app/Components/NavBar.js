import React, { Component } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default class NavBar extends Component {

	constructor(props) {
		super(props);
		this.state = {text: this.props.name};

		this.onChangeText = this.onChangeText.bind(this);
	}

	onChangeText(text) {
		this.setState({text: text});
	}

	render() {
		return (
			<View style={styles.nav}>
				<View style={styles.top}>
					<TextInput onChangeText={this.onChangeText} placeholder='Search Companies' style={styles.input} value={this.state.text}/>
				</View>
				<View style={styles.bottom} />
       		</View>
		)
	}

}

const styles = StyleSheet.create({
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
		height: 40
	},
	input: {
		flex: 1,
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