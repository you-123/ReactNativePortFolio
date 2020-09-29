import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderProduct({product}) {
    if (product) {
        return (
            <Card
                featuredTitle={product.name}
                image={require('./images/artculsmall0.jpg')}>
                <Text style={{margin: 10}}>
                    {product.ProductDescription}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function SingleProduct(props) {
    return <RenderProduct product={props.product} />;
}

export default  SingleProduct;
