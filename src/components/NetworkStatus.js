import React from 'React';
import {List} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {Text, StyleSheet} from 'react-native';
import console = require('console');

export default class NetworkProvider extends React.Component {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }
  handleConnectivityChange = isConnected => {
    this.setState({isConnected});
    console.log(this.state.isConnected);
  };
}