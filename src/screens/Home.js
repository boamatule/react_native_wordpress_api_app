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
  Headline,
  withTheme
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Card from '../components/Card';
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
    const {colors} = this.props.theme;
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
                <Card
                item={item}
                navigation={this.props.navigation}
                textColor={colors.text}
                />
              )}
            keyExtractor={item => item.id}
          />
      </View>
    );
  }
}

export default withTheme(Home);