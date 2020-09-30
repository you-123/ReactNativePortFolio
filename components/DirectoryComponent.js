import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {PRODUCTS} from '../shared/products';
class Directory extends Component {
    constructor(props) {
            super(props);
            this.state = {
                products: PRODUCTS
                
            };
        }

    static navigationOptions = {
        title: 'Catalog'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
                return (
                    <ListItem
                        title={item.name}
                        subtitle={item.ProductDescription}
                        onPress={() =>navigate('SingleProduct', { productId: item.id })}
                        leftAvatar={{ source:require('./images/artculsmall0.jpg')}}
                    />
                );
            }; 
        
    return (
        <FlatList
            data={this.state.products}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
    }
}

export default Directory;