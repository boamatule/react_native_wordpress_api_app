import React from 'react';
import {
  FlatList,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
const cacheKey = 'CategoriesCache';
import AsyncStorage from '@react-native-community/async-storage';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategorie();
  }
  async fetchCategorie() {
    this.setState({loading: true});
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          Alert.alert("You're currently offline and no local data was found.");
        }

        const categories = JSON.parse(_cachedData);
        console.log('cachedData', _cachedData);
        this.setState({
          categories: categories.categories,
          isFetching: false,
        });
        Alert.alert('your still read from cache')
      }

    const response = await fetch(`https://kriss.io/wp-json/wp/v2/categories`);
    const categories = await response.json();
    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({
        categories,
      }),
    );

    this.setState({
      categories: categories,
      isFetching: false,
    });
  } catch (error) {
    console.log('got error', error);
    return Promise.reject(error);
    }
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.categories}
          renderItem={({item}) => (
            <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('CategorieList', {
              categorie_id: item.id,
                categorie_name: item.name,
              })
            }>
            <Card>
              <Card.Content>
                <Title>{item.name}</Title>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
     </ScrollView>
    );
  }
}
