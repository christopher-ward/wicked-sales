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
      cardCVVVisualFeedback: '',
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
    if (target.classList.contains('credit') && value.length > 1) {
      let valueRaw = value;
      valueRaw = valueRaw.split('-').join('');
      // this.inputCheck(value);
      const valueFinal = valueRaw.match(/.{1,4}/g).join('-');
      this.setState({
        creditCard: valueFinal
      });
      return;
    }
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
    const inputName = prevInput.name;
    const inputValue = prevInput.value;
    const inputValueLength = prevInput.value.length;
    const inputMin = prevInput.minLength;
    const currentCheck = `${inputName}Check`;
    const currentVisual = `${inputName}VisualFeedback`;
    if (inputValueLength < inputMin) {
      switch (inputName) {
        case 'name':
          this.setState({
            nameCheck: 'Full name required!',
            nameVisualFeedback: 'fa-times'
          });
          break;
        case 'creditCard':
          this.setState({
            creditCardCheck: 'Credit Card number required!',
            creditCardVisualFeedback: 'fa-times'
          });
          break;
        case 'cardExpDate':
          this.setState({
            cardExpDateCheck: 'Exp. Date required!',
            cardExpDateVisualFeedback: 'fa-times'
          });
          break;
        case 'cardCVV':
          this.setState({
            cardCVVCheck: 'CVV required!',
            cardCVVVisualFeedback: 'fa-times'
          });
          break;
        case 'shippingAddress':
          this.setState({
            shippingAddressCheck: 'Shipping Address required!',
            shippingAddressVisualFeedback: 'fa-times'
          });
          break;
        case 'emailAddress':
          this.setState({
            emailAddressCheck: 'Email Address required!',
            emailAddressVisualFeedback: 'fa-times'
          });
          break;
        default:
          // eslint-disable-next-line no-console
          console.log('Something went wrong in the switch');
      }
    } else if (prevInput.classList.contains('email') && !inputValue.match(/(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,227}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{2,24})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
      this.setState({
        emailAddressCheck: 'email@domain.com style format required!',
        emailAddressVisualFeedback: 'fa-times'
      });
    } else {
      this.setState({
        [currentCheck]: '',
        [currentVisual]: 'fa-check'
      });
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
      } else if (creditCard.length < 16) {
        this.setState({
          creditCardCheck: 'Credit Card number required!',
          creditCardVisualFeedback: 'fa-times'
        });
      } else if (cardExpDate.length < 7) {
        this.setState({
          cardExpDateCheck: 'Exp. Date required!',
          cardExpDateVisualFeedback: 'fa-times'
        });
      } else if (cardCVV.length < 3) {
        this.setState({
          cardCVVCheck: 'CVV required!',
          cardCVVVisualFeedback: 'fa-times'
        });
      } else if (shippingAddress.length < 21) {
        this.setState({
          shippingAddressCheck: 'Shipping Address required!',
          shippingAddressVisualFeedback: 'fa-times'
        });
      } else if (emailAddress.length < 6) {
        this.setState({
          emailAddressCheck: 'Email Address required!',
          emailAddressVisualFeedback: 'fa-times'
        });
      } else if (!emailAddress.match(/(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,227}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{2,24})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
        this.setState({
          emailAddressCheck: 'email@domain.com style format required!',
          emailAddressVisualFeedback: 'fa-times'
        });
      }
      return false;
    }
    return true;
  }

  render() {
    const nameResultVisual = this.state.nameVisualFeedback;
    const creditCardResultVisual = this.state.creditCardVisualFeedback;
    const addressResultVisual = this.state.shippingAddressVisualFeedback;
    const cardExpDateResultVisual = this.state.cardExpDateVisualFeedback;
    const cardCVVResultVisual = this.state.cardCVVVisualFeedback;
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
                minLength={5}
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
                  className="credit number"
                  value={this.state.creditCard}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onKeyUp={this.addSymbol}
                  minLength={19}
                  maxLength={19} />
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
                  minLength={7}
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
                  minLength={3}
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
                  minLength={6}
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
                minLength={21}
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
