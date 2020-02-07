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

  componentDidMount() {
    this.fetchCategorie();
  }
  async fetchCategorie() {
    this.setState({loading: true});
    const response = await fetch('https://kriss.io/wpjson/wp/v2/categories');
    const categories = await response.json();
    this.setState({
      categories: categories,,
    });
  }

  render() {
    return (
      <View>
        <Text> Categories </Text>
      </View>
    );
  }
}
