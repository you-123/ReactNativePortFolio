import React, { Component } from 'react';
import { View, Text,  StyleSheet, Button, Animated,FlatList } from 'react-native';
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
    postFavorite:productId => (postFavorite(productId)),
    postToCart: productId => (postToCart(productId))
};


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
    
  
    render() {
        const { navigate } = this.props.navigation;
        const renderFeaturedItem = ({item}) => {
            return (
                <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
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
                        name='angle-left'
                        type='font-awesome'
                        color='#f8b9c6'
                        raised
                        reverse
                        onPress={() => navigate('SingleProduct', { productId: item.id })}
                    />
                    <Icon style={styles.cardItem}
                        name='angle-right'
                        type='font-awesome'
                        color='#f8b9c6'
                        raised
                        reverse
                        onPress={() => navigate('SingleProduct', { productId: item.id })}
                    />
                </View>
            </Card>
            </Animated.ScrollView>
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
            data={this.props.products.products.filter(product => product.featured)}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id.toString()}
        />
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