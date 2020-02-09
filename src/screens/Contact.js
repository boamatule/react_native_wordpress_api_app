import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';
import t from 'tcomb-form-native'; // 0.6.9

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
  }
}
