import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import  SingleProduct from './ProductDetailComponent';
import { View, Platform } from 'react-native';
import {createStackNavigator, createDrawerNavigator}  from 'react-navigation';

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen:Directory},
        SingleProduct: { screen:SingleProduct }
    }, 
    {
        initialRouteName:'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'crimson'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Catalog: { screen: DirectoryNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);
class Main extends Component {
  

    render() {
        return(
        <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
           </View>
       
            );
    }
}

export default Main;
