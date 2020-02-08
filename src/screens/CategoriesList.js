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
}
