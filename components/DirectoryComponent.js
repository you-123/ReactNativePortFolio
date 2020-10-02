import React, { Component } from 'react';
import { FlatList, View, Text  } from 'react-native';
import { Tile ,SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
const mapStateToProps = state => {
    return {
        products: state.products
    };
};

class Directory extends Component {
  
        

    static navigationOptions = {
        title: 'Catalog',
   headerRight: ( 
        <SearchBar
        placeholder="Type Here..."
        onChangeText
        value
      />
   ),
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.ProductDescription}
                    featured
                    onPress={() => navigate('SingleProduct', { productId: item.id })}
                    imageSrc={{uri:baseUrl+item.image}}
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
            data={this.props.products.products}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
    }
}

export default connect(mapStateToProps)(Directory);