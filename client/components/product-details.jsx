import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.state.product.productId}`)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.error('Caught in ProductDetails.componentDidMount:', err);
      });
  }

  render() {
    return null;
  }
}
