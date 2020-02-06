import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';
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
      lastestpost: [],
      isFetching: false,
    };
  }
  componentDidMount() {
    this.fetchLastestPost();
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.fetchLastestPost();
    });
  }

  async fetchLastestPost() {
    const response = await fetch(
      'https://kriss.io/wp-json/wp/v2/posts?per_page=5',
    );
    const post = await response.json();
    this.setState({lastestpost: post, isFetching: false});
  }

  render() {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>
          {' '}
          <Text> Lastest Post </Text>
        </Headline>
        <FlatList
          data={this.state.lastestpost}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
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
                <Paragraph>
                  Published on
                  {moment(item.date).fromNow()}
                </Paragraph>
              </Card.Content>
              <Card.Cover source={{uri: item.jetpack_featured_media_url}} />

              <Card.Content>
                <HTMLRender html={item.excerpt.rendered} />
              </Card.Content>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
