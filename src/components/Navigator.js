import React, {useContext } from 'react';
import {ThemeContext} from './ThemeManager';
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
import { Provider as PaperProvider, DarkTheme, DefaultTheme} from 'react-native-paper';

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

export default () => {
  const {theme} = useContext(ThemeContext);
  let paper_theme = theme ? DarkTheme : DefaultTheme;
  let nav_theme = theme ? 'dark' : 'light';
  
  return (
    <PaperProvider theme={paper_theme}>
    <Navigation theme={nav_theme} />
    </PaperProvider>
    );
   };

