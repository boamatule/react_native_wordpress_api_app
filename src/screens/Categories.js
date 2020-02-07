import React from 'react';
import {FlatList, ScrollView, View, TouchableOpacity, Text} from 'react-native';
export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
    };
  }

  render() {
    return (
      <View>
        <Text> Categories </Text>
      </View>
    );
  }
}
