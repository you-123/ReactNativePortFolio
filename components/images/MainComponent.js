import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import {PRODUCTS} from '../shared/products';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: PRODUCTS
        };
    }

    render() {
        return <Directory products={this.state.products}/>;
    }
}
export default Main;