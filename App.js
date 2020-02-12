/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Navigator from './src/components/Navigator';
import {ThemeManager} from './src/components/ThemeManager';
// import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   SplashScreen.hide();
  // }

  render() {
    return (
      <>
        <ThemeManager>
          <Navigator />
        </ThemeManager>
      </>
    );
  }
}
