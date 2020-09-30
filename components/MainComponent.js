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
                backgroundColor: '#DC143C'
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
                backgroundColor: '#DC143C'
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
        drawerBackgroundColor: '#f8b9c6'
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
