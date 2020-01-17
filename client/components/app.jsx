import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'details', // hardcoded to details to work on that section, default is 'catalog'
        params: {
          productId: 3 // hardcoded to work on add to cart button, default is params: {},
        },
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
      .catch(err => {
        console.error('Caught in App.getCartItems:', err);
      });
  }

  addToCart(product) {
    const fetchURL = '/api/cart';
    const initObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    const fetchRequest = new Request(fetchURL, initObj);
    fetch(fetchRequest)
      .then(response => {
        return response.json();
      })
      .then(response => {
        const newCart = this.state.view.cart.concat(response);
        this.setState({
          view: {
            cart: newCart
          }
        });
      })
      .catch(err => {
        console.error('Caught in App.addToCart:', err);
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
          <Header cartItemCount={this.state.view.cart.length}/>
          <ProductList view={this.setView} />
        </>
      );
    }
    return (
      <>
        <Header cartItemCount={this.state.view.cart.length}/>
        <ProductDetails
          productId={this.state.view.params.productId}
          view={this.setView}/>
      </>
    );
  }
}
