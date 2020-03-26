import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameCheck: '',
      nameVisualFeedback: '',
      creditCard: '',
      creditCardCheck: '',
      creditCardVisualFeedback: '',
      cardExpDate: '',
      cardExpDateCheck: '',
      cardExpDateVisualFeedback: '',
      cardCVV: '',
      cardCVVCheck: '',
      cardSecCodeVisualFeedback: '',
      emailAddress: '',
      emailAddressCheck: '',
      emailAddressVisualFeedback: '',
      phoneNumber: '',
      phoneNumberCheck: '',
      phoneNumberVisualFeedback: '',
      shippingAddress: '',
      shippingAddressCheck: '',
      shippingshippingAddressVisualFeedback: '',
      inputInvalid: '',
      prevInput: ''
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const prevInput = this.state.prevInput;
    if (value.match(/\D/g) && target.classList.contains('number')) {
      return;
    }
    const length = value.length;
    const currentCheck = `${name}Check`;
    if (this.state[name][currentCheck]) {
      this.inputCheck(prevInput);
      this.setState({
        inputInvalid: name
      });
    } else if (this.state.inputInvalid === name && length < this.state[name].value.length) {
      this.inputCheck(prevInput);
    }
    this.setState({
      [name]: value
    });
  }

  handleFocus(event) {
    this.setState({
      prevInput: event.target
    });
  }

  handleBlur(event) {
    const { prevInput } = this.state;
    this.inputCheck(prevInput);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.submitCheck()) {
      return;
    }
    const orderObj = {
      name: this.state.name,
      creditCard: parseInt(this.state.creditCard),
      phoneNumber: parseInt(this.state.phoneNumber) || 'N/A',
      emailAddress: parseInt(this.state.emailAddress),
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderObj);
  }

  inputCheck(prevInput) {
    switch (prevInput.name) {
      case 'name':
        if (prevInput.value.length < 5) {
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
        break;
      case 'creditCard':
        if (prevInput.value.length < 16) {
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
        break;
      case 'cardExpDate':
        if (prevInput.value.length < 7) {
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
        break;
      case 'cardCVV':
        if (prevInput.value.length < 3) {
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
        break;
      case 'shippingAddress':
        if (prevInput.value.length < 21) {
          this.setState({
            shippingAddressCheck: 'Shipping Address required!',
            shippingAddressVisualFeedback: 'fa-times'
          });
        } else {
          this.setState({
            shippingAddressCheck: '',
            shippingAddressVisualFeedback: 'fa-check'
          });
        }
        break;
      case 'emailAddress':
        if (prevInput.value.length < 6) {
          this.setState({
            emailAddressCheck: 'Email Address required!',
            emailAddressVisualFeedback: 'fa-times'
          });
        } else {
          this.setState({
            emailAddressCheck: '',
            emailAddressVisualFeedback: 'fa-check'
          });
        }
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('Something went wrong in the switch');
    }
  }

  submitCheck() {
    const { name, creditCard, cardExpDate, cardCVV, emailAddress, shippingAddress } = this.state;
    if (name.length < 5 || creditCard.length < 16 || cardExpDate.length < 7 || cardCVV.length < 3 || emailAddress.length < 6 || shippingAddress.length < 21) {
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
          shippingAddressCheck: 'Shipping Address required!',
          shippingAddressVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          shippingAddressCheck: '',
          shippingAddressVisualFeedback: 'fa-check'
        });
      }
      if (emailAddress.length < 6) {
        this.setState({
          emailAddressCheck: 'Email Address required!',
          emailAddressVisualFeedback: 'fa-times'
        });
      } else {
        this.setState({
          emailAddressCheck: '',
          emailAddressVisualFeedback: 'fa-check'
        });
      }
      return false;
    }
    return true;
  }

  checkInputProgress() {

  }

  render() {
    const nameResultVisual = this.state.nameVisualFeedback;
    const creditCardResultVisual = this.state.creditCardVisualFeedback;
    const addressResultVisual = this.state.shippingAddressVisualFeedback;
    const cardExpDateResultVisual = this.state.cardExpDateVisualFeedback;
    const cardCVVResultVisual = this.state.cardSecCodeVisualFeedback;
    const emailAddressResultVisual = this.state.emailAddressVisualFeedback;
    const phoneNumberResultVisual = this.state.phoneNumberVisualFeedback;
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
                onChange={this.handleFormChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                maxLength={65} />
              <div className="d-flex input-feedback">
                <i className={`fas ${nameResultVisual}`} />
                <small>{this.state.nameCheck}</small>
              </div>
            </div>
            <div className="row">
              <div className="d-flex col-lg-6 col-12 flex-column form-group">
                <label htmlFor="creditCard">Credit Card</label>
                <input
                  type="text"
                  name="creditCard"
                  id="creditCard"
                  className="number"
                  value={this.state.creditCard}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={16} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${creditCardResultVisual}`} />
                  <small>{this.state.creditCardCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-4 col-8 form-group">
                <label htmlFor="cardExpDate">Expiration Date</label>
                <input
                  type="text"
                  name="cardExpDate"
                  id="cardExpDate"
                  className="number"
                  value={this.state.cardExpDate}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={7} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${cardExpDateResultVisual}`} />
                  <small>{this.state.cardExpDateCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-2 col-4 form-group">
                <label htmlFor="cardCVV">CVV</label>
                <input
                  type="text"
                  name="cardCVV"
                  id="cardCVV"
                  className="number"
                  value={this.state.cardCVV}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={4} />
                <div className="d-flex input-feedback cvv">
                  <i className={`fas ${cardCVVResultVisual}`} />
                  <small>{this.state.cardCVVCheck}</small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex col-lg-6 col-12 flex-column form-group">
                <label htmlFor="emailAddress">Email</label>
                <input
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  className="email"
                  value={this.state.emailAddress}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={254} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${emailAddressResultVisual}`} />
                  <small>{this.state.emailAddressCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-6 col-12 form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={11} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${phoneNumberResultVisual}`} />
                  <small>{this.state.phoneNumberCheck}</small>
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
                onChange={this.handleFormChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                maxLength={156} />
              <div className="d-flex input-feedback">
                <i className={`fas ${addressResultVisual}`} />
                <small>{this.state.shippingAddressCheck}</small>
              </div>
            </div>
            <button className="btn btn-success mt-2" type="submit">Place Order</button>
          </form>
        </div>
      </div>
    );
  }
}
