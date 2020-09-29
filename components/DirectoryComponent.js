import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.ProductDescription}
                onPress={() => props.onPress(item.id)}
                leftAvatar={{ source:require('./images/artculsmall0.jpg')}}
            />
        );
    };

    return (
        <FlatList
            data={props.products}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;