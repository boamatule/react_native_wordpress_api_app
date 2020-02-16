import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Title, Paragraph, Headline} from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';


const cacheKey = 'Bookmark';
class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark_post: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.fetchBookmark();
    });
  }
  async fetchBookmark() {
    this.setState({isFetching: true});
    let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        return result.join('&');
      } else {
        return null;
      }
    });
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          Alert.alert("You're currently offline and no local data was found.");
        }

        console.log('cachedData', _cachedData);
        const cachedData = JSON.parse(_cachedData);

        this.setState({
          bookmark_post: cachedData.bookmark_post,
          isFetching: false,
        });
        Alert.alert('your still read from cache');
      }
      const response = await fetch(
        `https://kriss.io/wp-json/wp/v2/posts?${bookmark}`,
      );
      const bookmark_post = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          bookmark_post,
        }),
      );
      this.setState({bookmark_post: bookmark_post, isFetching: false});
    } catch (error) {
      console.log('Bookmark error', error);
      return Promise.reject(error);
    }
  }

  render() {
    return (
      <View>
        {this.state.isFetching ? (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: '#CED0CE',
            }}>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          <View>
            
            <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>
            <FlatList
              data={this.state.bookmark_post}
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
                      <Paragraph>
                        Published on {moment(item.date).fromNow()}
                      </Paragraph>
                    </Card.Content>
                    <Card.Cover
                      source={{uri: item.jetpack_featured_media_url}}
                    />
                    <Card.Content>
                      <Card.Content>
                        <HTMLRender html={item.excerpt.rendered} />
                      </Card.Content>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    );
  }
}
export default withNavigationFocus(Bookmark);