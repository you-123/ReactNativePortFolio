import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
const mapStateToProps = state => {
    return {
        products: state.products,
        favorites: state.favorites

    };
};
class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.ProductDescription}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    onPress={() => navigate('SingleProduct', { productId: item.id })}
                />
            );
        };
        if (this.props.products.isLoading) {
            return <Loading />;
        }
        if (this.props.products.errMess) {
            return (
                <View>
                    <Text>{this.props.products.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.products.products.filter(
                    product => this.props.favorites.includes(product.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Favorites);