import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {List, Switch} from 'react-native-paper';
import render from 'dom-serializer';

const Setting = ({navigation}) => {

  // render() {
  //   const {colors} = this.props.theme;
    return (
      <List.Section>
        <List.Item
        title="Dark Mode"
        left={() => <List.Icon icon="brightness-4" />}
        right={() => <Switch/>}
        />
        <TouchableOpacity
        onPress={() => {navigation.navigate('Contact')}}>
        <List.Item
        title="Contact Us"
        left={() => <List.Icon icon="chevron-right" />}
        />
        </TouchableOpacity>
        </List.Section>
      );
    };

  // }
  
  Setting.navigationOptions = {
    title: 'Setting',
    };
 export default Setting;
