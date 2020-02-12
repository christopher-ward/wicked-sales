import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'checkout', // testing for checkout. default is 'catalog'
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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
        const newCart = this.state.cart.concat(response);
        this.setState({
          view: {
            name: this.state.view.name,
            params: {
              productId: product.productId
            }
          },
          cart: newCart
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
      },
      cart: this.state.cart
    });
  }

  placeOrder(orderObj) {
    // orderObj will contain name, creditCard, and shippingAddress
    const fetchURL = '/api/orders';
    const initObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderObj)
    };
    const fetchRequest = new Request(fetchURL, initObj);
    fetch(fetchRequest)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      })
      .catch(err => {
        console.error('Caught in App.placeOrder:', err);
      });
  }

  render() {
    const cartLength = this.state.cart.length;
    if (this.state.view.name === 'catalog') {
      return (
        <>
          <Header
            cartItemCount={cartLength}
            view={this.setView}/>
          <ProductList view={this.setView} />
        </>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <>
          <Header
            cartItemCount={cartLength}
            view={this.setView} />
          <CartSummary
            cartItems={this.state.cart}
            view={this.setView}/>
        </>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <>
          <Header
            cartItemCount={cartLength}
            view={this.setView} />
          {/* <CheckoutForm placeOrder={this.placeOrder}/> */}
          <CheckoutForm />
        </>
      );
    }
    return (
      <>
        <Header
          cartItemCount={cartLength}
          view={this.setView} />
        <ProductDetails
          productId={this.state.view.params.productId}
          view={this.setView}
          addToCart={this.addToCart}/>
      </>
    );
  }
}
