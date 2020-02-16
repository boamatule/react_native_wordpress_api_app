import React from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import moment from 'moment';
import HTML from 'react-native-render-html';
// import Card from '../components/Card';

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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

  render() {
    categorie_title = this.props.navigation.getParam('title');
    return (
      <View>
        <Title style={{marginLeft: 30}}>{categorie_title}</Title>
        <FlatList
          data={this.state.posts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SinglePost', {
                  post_id: item.id,
                })
              }>
              <Card
                item={item}
                navigation={this.props.navigation}
                textColor={colors.text}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
