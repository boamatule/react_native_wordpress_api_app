import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';
import {
  Avatar,
  Button,
  Title,
  Paragraph,
  List,
  Card,
  Headline,
  withTheme
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import Card from '../components/Card';
 class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastestpost: [],
      isFetching: false,
      page: 1,
    };
  }

  renderFooter = () => {
    if (this.state.isFetching) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.fetchLastestPost();
    });
  }

  componentDidMount() {
    this.fetchLastestPost();
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchLastestPost();
      },
    );
  };

  async fetchLastestPost() {
    let page = this.state.page;
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?per_page=5&page=${page}`,
    );
    const post = await response.json();
    this.setState({
      lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
      isFetching: false,
    });
  }
  render() {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Lastest Post</Headline>
        <FlatList
          data={this.state.lastestpost}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SinglePost', {
                  post_id: item.id,
                })
              }>
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
                  {/* <Paragraph>
                    <Text> Published {moment(item.date).fromNow()}</Text>
                  </Paragraph> */}
                  <List.Item
                    title={`Published ${moment(item.date).fromNow()}`}
                  />
                </Card.Content>
                <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
                <Card.Content>
                  <HTMLRender html={item.excerpt.rendered} />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default withTheme(Home);