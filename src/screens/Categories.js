import React from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {Card, Title} from 'react-native-paper';

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
    const response = await fetch('https://kriss.io/wpjson/wp/v2/categories');
    const categories = await response.json();
    this.setState({
      categories: categories,
    });
  }

  render() {
    return (
      <ScrollView>
        <View>
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
        </View>
      </ScrollView>
    );
  }
}
