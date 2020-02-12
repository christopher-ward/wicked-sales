import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(event) {
    const value = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderObj = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderObj);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <form className="col-8 align-items-center my-3" onSubmit={this.handleSubmit}>
          <div className="d-flex flex-column form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleFormChange}></input>
          </div>
          <div className="d-flex flex-column form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input type="number" name="creditCard" id="creditCard" value={this.state.creditCard} onChange={this.handleFormChange}></input>
          </div>
          <div className="d-flex flex-column form-group">
            <label htmlFor="address">Shipping Address</label>
            <textarea type="textarea" name="shippingAddress" id="address" value={this.state.shippingAddress} onChange={this.handleFormChange}></textarea>
          </div>
          <button className="btn btn-success" type="submit">Place Order</button>
        </form>
      </div>
    );
  }
}
