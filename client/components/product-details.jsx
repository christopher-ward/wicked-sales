import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const productId = this.props.productId;
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
    const resetView = () => this.props.view('catalog', {});
    return (
      <div className="container my-3 details">
        <div className="row no-gutters mt-3">
          <div className="col-sm-6 col-lg-4">
            <span className="back ml-3"
              onClick={resetView}>{'< Back to Results'}</span>
            <img src={productImage} className="card-img mt-4" alt={altText} />
          </div>
          <div className="col-sm-6 col-lg-8">
            <h4 className="card-title mt-5 pt-2">{productName}</h4>
            <h5>{`$${parseFloat(productPrice / 100).toFixed(2)}`}</h5>
            <p>{productShortDescription}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
        <div className="col-12 no-gutters p-2 mt-4">
          <p>{productLongDescription}</p>
        </div>
      </div>
    );
  }
}
