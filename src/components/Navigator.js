import React, {useContext, useState} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Settings from '../screens/Settings';
import Bookmark from '../screens/Bookmark';

const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },

    Categories: {
      screen: Categories,
      navigationOptions: {
        tabBarLabel: 'Categories',
      },
    },

    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarLabel: 'Bookmark',
      },
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Settings',
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
});

export default createAppContainer(StackNavigator);
