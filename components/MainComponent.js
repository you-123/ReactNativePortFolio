import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import {PRODUCTS} from '../shared/products';
import  SingleProduct from './ProductDetailComponent';
import { View } from 'react-native';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS,
            selectedProduct: null
        };
    }
    onProductsSelect(productId) {
        this.setState({selectedProduct: productId});
    }

    render() {
        return(    <View style={{flex: 1}}>
        <Directory products={this.state.products}
        onPress={productId => this. onProductsSelect(productId)}
         />
        <SingleProduct
                    product={this.state.products.filter(
                        product => product.id === this.state.selectedProduct)[0]}
                />
        </View>
            );
    }
}

export default Main;