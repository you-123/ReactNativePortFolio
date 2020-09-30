import React, { Component } from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import {PRODUCTS} from '../shared/products';


function RenderProduct(props)
 {    const  {product}=props;
    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={require('./images/artculsmall0.jpg')}>
                <Text style={{margin: 10}}>
                    {product.ProductDescription}
                </Text>
                <View style={styles.cardRow}>
                <Icon  
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
                <Icon  style={styles.cardItem}
                    name='shopping-basket' 
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => 'shopping-basket'  ? props.addToCart() :
                        console.log('Already in cart') }
                />
                </View>
            </Card>
        );
    }
    return <View />;
}


class  SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products:PRODUCTS,
            favorite: false
        };
    }

    static navigationOptions = {
        title: 'Product Information'
    }
    markFavorite() {
        this.setState({favorite: true});
    }
    addToCart() {
        console.log('Already in cart');
    }
    render() {
        const productId = this.props.navigation.getParam('productId');
        const product = this.state.products.filter(product => product.id===productId)[0];
        return <RenderProduct product={product}
        favorite={this.state.favorite}
        markFavorite={() => this.markFavorite()}
        addToCart={() => this.addToCart()}
        />;
    }
}
const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    }
});
export default  SingleProduct;
