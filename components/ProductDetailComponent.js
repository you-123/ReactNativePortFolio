import React, { Component } from 'react';
import { Text, View,StyleSheet, ScrollView,FlatList } from 'react-native';
import { Card,Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postToCart  } from '../redux/ActionCreators';
const mapStateToProps = state => {
    return {
        products: state.products,
        comments: state.comments,
        favorites: state.favorites,
        carts: state.carts
    };
};
const mapDispatchToProps = {
    postFavorite: productId => (postFavorite(productId)),
    postToCart:productId => (postToCart(productId))
};
function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
function RenderProduct(props)
 {    const  {product}=props;
    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={{uri: baseUrl + product.image}}>
                <Text style={{margin:10}}>
                    {product.ProductDescription}
                </Text>
                <View style={styles.cardRow}>
                <Text >
                  Price:{product.price}
                </Text>
                <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ?
                            console.log('Already set as a favorite') : props.markFavorite(product.id)}
                    />
                <Icon  style={styles.cardItem}
                    name='shopping-basket' 
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => 'shopping-basket'  ? props.addToCart(product.id) :
                        console.log(' cart') }
                />
                </View>
            </Card>
        );
    }
    return <View />;
}


class  SingleProduct extends Component {

   
    static navigationOptions = {
        title: 'Product Information'
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
        const product = this.props.products.products.filter(product => product.id===productId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.productId === this.props.products.id);
        return (
        <ScrollView>
        <RenderProduct product={product}
        favorite={this.props.favorites.includes(productId)}
        markFavorite={() => this.markFavorite(productId)}
        addToCart={() => this.addToCart(productId)}
        />
         <RenderComments comments={comments} />
        </ScrollView>
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
export default connect(mapStateToProps,mapDispatchToProps)(SingleProduct);
