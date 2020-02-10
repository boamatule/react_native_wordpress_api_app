import React, {Component} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      block_submit: false,
    };
  }

  async componentDidMount() {
    this.getSubmitDuration();
  }

  getSubmitDuration = async () => {
    let now = moment();
    await AsyncStorage.getItem('submit_time').then(submit_time => {
      let diff = moment.duration(now.diff(moment(submit_time))).asMinutes();
      console.log(diff);
      if (diff <= 60) {
        this.setState({block_submit: true});
      }
    });
  }

  handleSubmit = async () => {
    this.setState({submit: true});
    const value = this._form.getValue();
    let submit_time = moment().format();
    await AsyncStorage.setItem('submit_time', submit_time);

  firebase
    .database()
    .ref('contact/')
    .push(value)
    .then(res => {
      Alert.alert('thank for reaching me');;
    })
    .catch(err => {
      console.error(err);
    });
  };

  render() {
    const Form = t.form.Form;
  const options = {
  fields: {
    message: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 150,
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 150,
          },
        },
      },
    },
  },
};
const ContactForm = t.struct({
  email: t.String,
  name: t.String,
  message: t.String,
});

    if (this.state.block_submit) {
      return (
        <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
          <Image
          style={{width: 100, height: 100}}
          source={require('../assets/block.png')}
          />
        <Text style={{fontSize:25}}>You can submit again in next hour</Text>
      </View>
      );
    } else {
    return (
      <View style={styles.container}>
        <Form
          type={ContactForm}
          ref={c => (this._form = c)}
          options={options}
        />
        {this.state.submit ? (
            <ActivityIndicator />
          ) : (
          <TouchableOpacity
            ref="form"
            style={styles.button}
            onPress={this.handleSubmit}
            underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
}); 