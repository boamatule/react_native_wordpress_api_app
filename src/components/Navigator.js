import React, {useContext, useState} from 'react';
import {Button, StatusBar, Text, SafeAreaView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Setting from '../screens/Settings';
import SinglePost from '../screens/SinglePost';
import CategorieList from '../screens/CategorieList';
import Contact from '../screens/Contact';
import Bookmark from '../screens/Bookmark';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDarkMode} from 'react-native-dark-mode';
import NetworkStatus from './NetworkStatus';
import {ThemeContext} from './ThemeManager';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';

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
        tabBarLabel: 'BookMark',
        tabBarIcon: () => <Ionicons name="ios-bookmark" size={30} />,
      },
    },

    Setting: {
      screen: Setting,
      navigationOptions: ({navigation, screenProps}) => {
        return {
          tabBarLabel: 'Setting',
          tabBarIcon: () => <Ionicons name="md-settings" size={30} />,
        };
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];

      return {
        headerTitle: routeName,
        headerRight: <NetworkStatus />,
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

// eslint-disable-next-line react/display-name
export default () => {
  const isDarkMode = useDarkMode();
  const {theme} = useContext(ThemeContext);
  let paper_them = theme ? DarkTheme : DefaultTheme;
  let nav_theme = theme ? 'dark' : 'light';

  return (
    <PaperProvider theme={paper_them}>
      <Navigation theme={nav_theme} />
    </PaperProvider>
  );
};