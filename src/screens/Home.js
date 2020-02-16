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
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
const cacheKey = 'CacheData';

 class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastestpost: [],
      isFetching: false,
      page: 1,
      offline: false,
    };
  }

  renderFooter = () => {
    if (this.state.isFetching) return null;
    
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
    this.NetworkHandler();
  }
  async NetworkHandler() {
    NetInfo.fetch()
      .then(state => {
        if (!state.isConnected) {
          throw new Error('Currently offline.');
        }
      })
      .catch(error => {
        console.log('list error', error);
        Alert.alert(
          'Sorry, something went wrong. Please try again',
          error.message,
        );
      });
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
    try {
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
      const _cachedData = await AsyncStorage.getItem(cacheKey);
      if (!_cachedData) {
      throw new Error(
      "You're currently offline and no local data was found.",
      );
    }
    console.log('cachedData', _cachedData);
        const cachedData = JSON.parse(_cachedData);

        this.setState({
          lastestpost: cachedData.post,
          isFetching: false,
        });
      }
      let page = this.state.page;
      const response = await fetch(
        `https://kriss.io/wp-json/wp/v2/posts?per_page=5&page=${page}`,
      );
      const post = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          post,
        }),
      );

      this.setState({
        lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
        isFetching: false,
      });
    } catch (error) {
      console.log('geoFetch error', error);
      return Promise.reject(error);
    }
  }
  bannerError = e => {
    console.log('banner error: ');
    console.log(e);
  };
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