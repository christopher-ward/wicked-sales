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
      cardExpMon: '',
      cardExpMonCheck: '',
      cardExpMonVisualFeedback: '',
      cardExpYear: '',
      cardExpYearCheck: '',
      cardExpYearVisualFeedback: '',
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
    let value = target.value;
    const name = target.name;
    const prevInput = this.state.prevInput;
    if (target.classList.contains('number')) {
      if (target.classList.contains('credit')) {
        let valueRaw = value;
        valueRaw = valueRaw.split('-').join('');
        if (valueRaw.length > 0) {
          if (valueRaw[valueRaw.length - 1].match(/\d/g)) {
            value = valueRaw.match(/.{1,4}/g).join('-');
          } else {
            return;
          }
        }
      } else if (value.match(/\D/g)) {
        return;
      }
      /**
       * else if (target.classList.contains('expiration')) {
       *   if (target.classList.contains('month')) {
       *     if (value.length === 1 && )
       *   }
       * }
       */
      /*
      Check lenth of month. If, on blur, length is one then prepend 0 to value
      if length is 2, then check first value is 0 or 1, then if 1st value is 1 check that second value is 2 or less
      */
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
    // if (event.target.value.length === 1) {
    //   this.setState({
    //     this.state.cardExpMon
    //   })
    // }
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
        case 'cardExpMon':
          this.setState({
            cardExpMonCheck: 'Exp Mon required!',
            cardExpMonVisualFeedback: 'fa-times'
          });
          break;
        case 'cardExpYear':
          this.setState({
            cardExpYearCheck: 'Exp Year required!',
            cardExpYearVisualFeedback: 'fa-times'
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
    const { name, creditCard, cardExpMon, cardExpYear, cardCVV, emailAddress, shippingAddress } = this.state;
    if (name.length < 5 || creditCard.length < 16 || cardExpMon.length < 1 || cardExpYear.length < 4 || cardCVV.length < 3 || emailAddress.length < 6 || shippingAddress.length < 21) {
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
      } else if (cardExpMon.length < 1) {
        this.setState({
          cardExpMonCheck: 'Exp Mon required!',
          cardExpMonVisualFeedback: 'fa-times'
        });
      } else if (cardExpYear.length < 4) {
        this.setState({
          cardExpYearCheck: 'Exp Year required!',
          cardExpYearVisualFeedback: 'fa-times'
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
    const cardExpMonResultVisual = this.state.cardExpMonVisualFeedback;
    const cardExpYearResultVisual = this.state.cardExpYearVisualFeedback;
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
                placeholder="Your Name"
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
                  placeholder="1111-2222-3333-4444"
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
              <div className="d-flex flex-column col-lg-3 col-6 form-group">
                <label htmlFor="cardExpMon">Expiration Month</label>
                <input
                  type="text"
                  name="cardExpMon"
                  id="cardExpMon"
                  className="expiration month number"
                  placeholder="ex '06'"
                  value={this.state.cardExpMon}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  minLength={1}
                  maxLength={2} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${cardExpMonResultVisual}`} />
                  <small>{this.state.cardExpMonCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-3 col-6 form-group">
                <label htmlFor="cardExpYear">Expiration Year</label>
                <input
                  type="text"
                  name="cardExpYear"
                  id="cardExpYear"
                  className="expiration year number"
                  placeholder="ex '2021'"
                  value={this.state.cardExpYear}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  minLength={4}
                  maxLength={4} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${cardExpYearResultVisual}`} />
                  <small>{this.state.cardExpYearCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-2 col-5 form-group">
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
              <div className="d-flex flex-column col-lg-4 col-7 form-group">
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
