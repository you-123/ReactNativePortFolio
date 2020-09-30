import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import {PRODUCTS} from '../shared/products';


function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={require('./images/artculsmall0.jpg')}>
                <Text
                    style={{margin: 10}}>
                    {item.ProductDescription}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS
            
        };
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem 
                    item={this.state.products.filter(product=> product.featured)[0]} />
            </ScrollView>
        ); featured
    }
}

export default Home;