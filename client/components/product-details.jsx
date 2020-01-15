import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = 4;
    fetch(`/api/products/${productId}`)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          product: response
        });
      })
      .catch(err => {
        console.error('Caught in ProductDetails.componentDidMount:', err);
      });
  }

  render() {
    if (!this.state.product) {
      return this.state.product;
    }
    const productImage = this.state.product.image;
    const altText = `Image of ${this.state.product.name}`;
    const productName = this.state.product.name;
    const productPrice = this.state.product.price;
    const productShortDescription = this.state.product.shortDescription;
    const productLongDescription = this.state.product.longDescription;
    return (
      <div className="container mb-3 details">
        <div className="row no-gutters">
          <div className="col-sm-6 col-lg-4">
            <p className="back ml-3 mt-2">{'< Back to Results'}</p>
            <img src={productImage} className="card-img" alt={altText} />
          </div>
          <div className="col-sm-6 col-lg-8">
            <h4 className="card-title mt-5 pt-2">{productName}</h4>
            <h5>{`$${parseFloat(productPrice / 100).toFixed(2)}`}</h5>
            <p>{productShortDescription}</p>
          </div>
        </div>
        <div className="col-12 no-gutters p-2 mt-4">
          <p>{productLongDescription}</p>
        </div>
      </div>
    );
  }
}
