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
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
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
