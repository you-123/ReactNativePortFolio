import React, { Component } from 'react';
import { View, Text,  StyleSheet, Button, Animated } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { postFavorite } from '../redux/ActionCreators';
import { postToCart } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
        products: state.products,
        favorites: state.favorites,
        carts: state.carts
    };
};

const mapDispatchToProps = {
    postFavorite: productId => (postFavorite(productId)),
    postToCart: productId => (postToCart(productId))
};
function RenderItem(props) {
    const { item } = props;
    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{ uri: baseUrl + item.image }}>
                <Text
                    style={{ margin: 10 }}>
                    {item.ProductDescription}
                </Text>
                <View style={styles.cardRow}>
                    <Text >
                        Price:{item.price}
                    </Text>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ?
                            console.log('Already set as a favorite') : props.markFavorite()}
                    />
                    <Icon style={styles.cardItem}
                        name='shopping-basket'
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => 'shopping-basket' ? props.addToCart() :
                            console.log('Already in cart')}
                    />
                </View>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        };
    }

    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }
   
    static navigationOptions = {
        title: 'Home',
        headerRight: (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#f50"
            />
          ),
    }
    
    markFavorite(productId) {
        this.props.postFavorite(productId);
    }
    addToCart(productId) {
        this.props.postToCart(productId);
        console.log('Added   To cart');
    }
    render() {

        const productId = this.props.navigation.getParam('productId');
        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.products.products.filter(product => product.featured)[0]}
                    favorite={this.props.favorites.includes(productId)}
                    markFavorite={() => this.markFavorite(productId)}
                    addToCart={() => this.addToCart(productId)}
                    isLoading={this.props.products.isLoading}
                    errMess={this.props.products.errMess}
                />
                <RenderItem
                    item={this.props.products.products.filter(product => product.featured)[1]}
                    favorite={this.props.favorites.includes(productId)}
                    markFavorite={() => this.markFavorite(productId)}
                    addToCart={() => this.addToCart(productId)}
                    isLoading={this.props.products.isLoading}
                    errMess={this.props.products.errMess}
                />
                <RenderItem
                    item={this.props.products.products.filter(product => product.featured)[2]}
                    favorite={this.props.favorites.includes(productId)}
                    markFavorite={() => this.markFavorite(productId)}
                    addToCart={() => this.addToCart(productId)}
                    isLoading={this.props.products.isLoading}
                    errMess={this.props.products.errMess}
                />
           </Animated.ScrollView>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);