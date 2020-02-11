import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Settings from '../screens/Settings';
import Bookmark from '../screens/Bookmark';
import SinglePost from '../screens/SinglePost';
import CategorieList from '../screens/CategorieList';
import Contact from '../screens/Contact';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Ionicons name="md-home" size={30} />,
      },
    },

    Categories: {
      screen: Categories,
      navigationOptions: {
        tabBarLabel: 'Categories',
        tabBarIcon: () => <Ionicons name="md-apps" size={30} />,
      },
    },

    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarLabel: 'Bookmark',
        tabBarIcon: () => <Ionicons name="ios-bookmark" size={30} />,
      },
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: () => <Ionicons name="md-settings" size={30} />,
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];

      return {
        headerTitle: routeName,
      };
    },
  },
);

const StackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  SinglePost: SinglePost,
  CategorieList: CategorieList,
  Contact: Contact,
});

const Navigation = createAppContainer(StackNavigator);
export default () => <Navigation theme={'dark'} />

// export default createAppContainer(StackNavigator);