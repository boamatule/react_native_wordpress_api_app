import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Headline,
} from 'react-native-paper';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastestpost: []
    };
  }
  componentDidMount() {
    this.fetchLastestPost();
  }

  async fetchLastestPost() {
    const response = await fetch(
      'https://kriss.io/wp-json/wp/v2/posts?per_page=5',
    );

    const post = await response.json();
    this.setState({lastestpost: post});
  }

  render() {
    return (
      <View>
        <Headline style={{marginLeft: 30}}> </Headline>
        <FlatList
          data={this.state.lastestpost}
          renderItem={({item}) => (
            <Card
              style={{
                shadowOffset: {width: 5, height: 5},
                width: '90%',
                borderRadius: 12,
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              <Card.Content>
                <Title>{item.title.rendered}</Title>
              </Card.Content>
              <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
