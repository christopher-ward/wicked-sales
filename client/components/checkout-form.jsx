import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      cardExpDate: '',
      cardCVV: '',
      shippingAddress: '',
      nameCheck: '',
      creditCardCheck: '',
      cardExpDateCheck: '',
      cardCVVCheck: '',
      addressCheck: '',
      nameVisualFeedback: '',
      creditCardVisualFeedback: '',
      cardExpDateVisualFeedback: '',
      cardSecCodeVisualFeedback: '',
      addressVisualFeedback: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterCharacters = this.filterCharacters.bind(this);
  }

  handleFormChange(event) {
    const value = event.target.type === 'number' && event.target.length > 0 ? parseInt(event.target.value) : event.target.value;
    const name = event.target.name;
    // this.inputCheck();
    if (name === 'name' && value.length > 65) {
      return;
    } else if (name === 'creditCard' && value.length > 16) {
      return;
    } else if (name === 'cardExpDate' && value.length > 7) {
      return;
    } else if (name === 'cardCVV' && value.length > 4) {
      return;
    } else if (name === 'shippingAddress' && value.length > 156) {
      return;
    }
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
    if (!this.inputCheck()) {
      return;
    }
    this.props.placeOrder(orderObj);
  }

  inputCheck() {
    const { name, creditCard, cardExpDate, cardCVV, shippingAddress } = this.state;
    if (name.length < 5 || creditCard.length < 16 || cardExpDate.length < 7 || cardCVV.length < 3 || shippingAddress.length < 21) {
      if (name.length < 5) {
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
      if (creditCard.length < 16) {
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
      if (cardExpDate.length < 7) {
        this.setState({
          cardExpDateCheck: 'Exp. Date required!',
          cardExpDateVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          cardExpDateCheck: '',
          cardExpDateVisualFeedback: 'fa-check'
        });
      }
      if (cardCVV.length < 3) {
        this.setState({
          cardCVVCheck: 'CVV required!',
          cardSecCodeVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          cardCVVCheck: '',
          cardSecCodeVisualFeedback: 'fa-check'
        });
      }
      if (shippingAddress.length < 21) {
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
    const cardExpDateResultVisual = this.state.cardExpDateVisualFeedback;
    const cardCVVResultVisual = this.state.cardSecCodeVisualFeedback;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-8 align-items-center my-3 px-1 checkout-form" onSubmit={this.handleSubmit}>
            <div className="d-flex flex-column form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleFormChange} />
              <div className="d-flex">
                <i className={`fas ${nameResultVisual}`} />
                <small>{this.state.nameCheck}</small>
              </div>
            </div>
            <div className="row">
              <div className="d-flex col-lg-6 col-12 flex-column form-group">
                <label htmlFor="creditCard">Credit Card</label>
                <input
                  type="number"
                  name="creditCard"
                  id="creditCard"
                  value={this.state.creditCard}
                  onChange={this.handleFormChange}
                  onKeyDown={this.filterCharacters} />
                <div className="d-flex">
                  <i className={`fas ${creditCardResultVisual}`} />
                  <small>{this.state.creditCardCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-4 col-8 form-group">
                <label htmlFor="cardExpDate">Expiration Date</label>
                <input
                  type="number"
                  name="cardExpDate"
                  id="cardExpDate"
                  value={this.state.cardExpDate}
                  onChange={this.handleFormChange}
                  onKeyDown={this.filterCharacters} />
                <div className="d-flex">
                  <i className={`fas ${cardExpDateResultVisual}`} />
                  <small>{this.state.cardExpDateCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-2 col-4 form-group">
                <label htmlFor="cardCVV">CVV</label>
                <input
                  type="number"
                  name="cardCVV"
                  id="cardCVV"
                  value={this.state.cardCVV}
                  onChange={this.handleFormChange}
                  onKeyDown={this.filterCharacters} />
                <div className="d-flex">
                  <i className={`fas ${cardCVVResultVisual}`} />
                  <small>{this.state.cardCVVCheck}</small>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                type="textarea"
                name="shippingAddress"
                id="address"
                value={this.state.shippingAddress}
                onChange={this.handleFormChange} />
              <div className="d-flex">
                <i className={`fas ${addressResultVisual}`} />
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
