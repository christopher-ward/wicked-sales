import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart/')
      .then(response => {
        return response.json();
      })
      .then(response => {
        // console.log('Cart:', response);
      })
      .catch(err => {
        console.error('Caught in App.getCartItems:', err);
      });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header />
          <ProductList view={this.setView} />
        </>
      );
    }
    return (
      <>
        <Header />
        <ProductDetails
          productId={this.state.view.params.productId}
          view={this.setView}/>
      </>
    );
  }
}
