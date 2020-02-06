import React from 'react';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  List,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import moment from 'moment';
export default class SinglePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      post: [],
    };
  }

  componentDidMount() {
    this.fetchPost();
  }
  async fetchPost() {
    let post_id = this.props.navigation.getParam('post_id')

    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?_embed&include=${post_id}`
    );
    const post = await response.json();
    this.setState({
      post: post,
      isloading: false,
    });
  }
}