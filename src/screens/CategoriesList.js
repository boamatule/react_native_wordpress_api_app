import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';
import HTML from 'react-native-render-html';

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.fetchPost();
  }
  async fetchPost() {
    let categorie_id = this.props.navigation.getParam('categorie_id');
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?categories=${categorie_id}`,
    );
    const post = await response.json();
    this.setState({posts: post});
  }
}
