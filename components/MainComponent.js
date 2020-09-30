import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import  SingleProduct from './ProductDetailComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image  } from 'react-native';
import {createStackNavigator, createDrawerNavigator ,DrawerItems }  from 'react-navigation';
import { Icon, Button  } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
const DirectoryNavigator = createStackNavigator(
    {
        Directory:{ 
            screen: Directory,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
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
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#DC143C'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>XYZ Shopping</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            } },
        Catalog: { screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }}
    },
    {
        drawerBackgroundColor: '#f8b9c6',
        contentComponent: CustomDrawerContentComponent
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#db1446',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});
export default Main;
