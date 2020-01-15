import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
          products: response
        });
      })
      .catch(err => {
        console.error('Caught in ProductList.getProducts:', err);
      });
  }

  populateListItems() {
    return this.state.products.map(product =>
      <ProductListItem
        key={product.productId}
        id={product.productId}
        name={product.name}
        price={product.price}
        image={product.image}
        shortDescription={product.shortDescription}
        view={this.props.view}/>
    );
  }

  render() {
    const productList = this.populateListItems();
    return (
      <div className="container">
        <div className="row mx-5">
          {productList}
        </div>
      </div>
    );
  }
}
