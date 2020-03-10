import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      nameCheck: '',
      creditCardCheck: '',
      addressCheck: '',
      nameVisualFeedback: '',
      creditCardVisualFeedback: '',
      addressVisualFeedback: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);
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
    if (!this.inputCheck(orderObj)) {
      return;
    }
    this.props.placeOrder(orderObj);
  }

  inputCheck(orderObj) {
    const { name, creditCard, shippingAddress } = orderObj;
    if (name.length < 1 || creditCard.length < 1 || shippingAddress.length < 1) {
      if (name.length < 1) {
        this.setState({
          nameCheck: 'Full name required!',
          nameVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          nameCheck: '',
          nameVisualFeedback: 'fa-check'
        });
      }
      if (creditCard.length < 1) {
        this.setState({
          creditCardCheck: 'Credit Card number required!',
          creditCardVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          creditCardCheck: '',
          creditCardVisualFeedback: 'fa-check'
        });
      }
      if (shippingAddress.length < 1) {
        this.setState({
          addressCheck: 'Shipping Address required!',
          addressVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          addressCheck: '',
          addressVisualFeedback: 'fa-check'
        });
      }
      return false;
    }
    return true;
  }

  filterCharacters(event) {
    ['e', 'E', '+', '-', '.'].includes(event.key) && event.preventDefault();
  }

  render() {
    const nameResultVisual = this.state.nameVisualFeedback;
    const creditCardResultVisual = this.state.creditCardVisualFeedback;
    const addressResultVisual = this.state.addressVisualFeedback;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-8 align-items-center my-3 checkout-form" onSubmit={this.handleSubmit}>
            <div className="d-flex flex-column form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleFormChange}></input>
              <div className="d-flex">
                <i className={`fas ${nameResultVisual}`}></i>
                <small>{this.state.nameCheck}</small>
              </div>
            </div>
            <div className="d-flex flex-column form-group">
              <label htmlFor="creditCard">Credit Card</label>
              <input
                type="number"
                name="creditCard"
                id="creditCard"
                value={this.state.creditCard}
                onChange={this.handleFormChange}
                onKeyDown={this.filterCharacters}></input>
              <div className="d-flex">
                <i className={`fas ${creditCardResultVisual}`}></i>
                <small>{this.state.creditCardCheck}</small>
              </div>
            </div>
            <div className="d-flex flex-column form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea type="textarea" name="shippingAddress" id="address" value={this.state.shippingAddress} onChange={this.handleFormChange}></textarea>
              <div className="d-flex">
                <i className={`fas ${addressResultVisual}`}></i>
                <small>{this.state.addressCheck}</small>
              </div>
            </div>
            <button className="btn btn-success" type="submit">Place Order</button>
          </form>
        </div>
      </div>

    );
  }
}
