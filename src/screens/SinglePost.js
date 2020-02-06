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
}