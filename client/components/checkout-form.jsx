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
      phoneNumberRaw: '',
      phoneNumberCheck: '',
      phoneNumberVisualFeedback: '',
      shippingAddress: '',
      shippingAddressCheck: '',
      shippingshippingAddressVisualFeedback: '',
      inputInvalid: '',
      prevInput: '',
      submitDisabled: true
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
    const classList = target.classList;
    if (classList.contains('number')) {
      let valueRaw = value;
      if (classList.contains('credit')) {
        valueRaw = valueRaw.split('-').join('');
        if (valueRaw.length > 0) {
          if (valueRaw[valueRaw.length - 1].match(/\d/g)) {
            value = valueRaw.match(/.{1,4}/g).join('-');
          } else {
            return;
          }
        }
      } else if (classList.contains('phone')) {
        valueRaw = valueRaw.split(/[-+ ()]/g).join('');
        if (valueRaw.length > 0) {
          if (valueRaw[valueRaw.length - 1].match(/\D/g) || valueRaw.length > 11) {
            return;
          }
          this.setState({
            phoneNumberRaw: valueRaw
          });
        } else if (valueRaw.length === 0) {
          this.setState({
            phoneNumberRaw: ''
          });
        }
      } else if (value.match(/\D/g)) {
        return;
      } else if (classList.contains('expiration')) {
        if (classList.contains('month')) {
          if (value.length === 2) {
            if (value[0] > 1) {
              value = '12';
            } else if (value[0] === '1') {
              if (value[1] > 2) {
                value = '12';
              }
            }
          }
        }
      }
    }
    const currentCheck = `${name}Check`;
    const currentVisualFeedback = `${name}VisualFeedback`;
    this.setState({
      [name]: value,
      [currentCheck]: '',
      [currentVisualFeedback]: ''
    }, this.formCheck);
  }

  handleFocus(event) {
    this.setState({
      prevInput: event.target
    });
  }

  handleBlur(event) {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const { prevInput } = this.state;
    const tempInput = prevInput;
    const classList = event.target.classList;
    let value = event.target.value;
    if (classList.contains('month')) {
      if (value === '0' || value === '') {
        this.setState({
          cardExpMon: ''
        });
        tempInput.value = '';
      } else if (value.length === 1) {
        value = `0${value}`;
        this.setState({
          cardExpMon: value
        });
        tempInput.value = value;
      }
      if (this.state.cardExpYear && value !== '') {
        if (this.state.cardExpYear === `${currentYear}`) {
          if (value <= currentMonth) {
            this.setState({
              cardExpMonCheck: 'Month is expired',
              cardExpMonVisualFeedback: 'fa-times'
            });
          } else {
            this.setState({
              cardExpMonCheck: ''
            });
          }
        }
        return;
      }
      this.inputCheck(tempInput);
    } else if (classList.contains('year')) {
      if (value.length === 2) {
        value = `20${value}`;
        if (value < currentYear) {
          this.setState({
            cardExpYearCheck: `Year is before ${currentYear}`,
            cardExpYearVisualFeedback: 'fa-times'
          });
          return;
        } else if (value >= currentYear) {
          this.setState({
            cardExpYear: value
          });
          if (this.state.cardExpMon) {
            if (value === `${currentYear}`) {
              if (this.state.cardExpMon <= currentMonth) {
                this.setState({
                  cardExpMonCheck: 'Month is expired',
                  cardExpMonVisualFeedback: 'fa-times'
                });
              } else {
                this.setState({
                  cardExpMonCheck: ''
                });
              }
            } else {
              this.setState({
                cardExpMonCheck: ''
              });
            }
          }
          tempInput.value = value;
          this.inputCheck(tempInput);
          return;
        }
      } else if (value.length === 4) {
        if (value < currentYear) {
          this.setState({
            cardExpYearCheck: `Year is before ${currentYear}`,
            cardExpYearVisualFeedback: 'fa-times'
          });
          return;
        } else if (value >= currentYear) {
          if (this.state.cardExpMon) {
            if (value === `${currentYear}`) {
              if (this.state.cardExpMon <= currentMonth) {
                this.setState({
                  cardExpMonCheck: 'Month is expired',
                  cardExpMonVisualFeedback: 'fa-times'
                });
              } else {
                this.setState({
                  cardExpMonCheck: ''
                });
              }
            } else {
              this.setState({
                cardExpMonCheck: ''
              });
            }
          }
        }
      }
    }
    this.inputCheck(prevInput);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.submitDisabled) {
      this.submitCheck();
      return;
    }
    let creditCardRaw = this.state.creditCard;
    creditCardRaw = creditCardRaw.split('-').join('');
    const orderObj = {
      name: this.state.name,
      creditCard: parseInt(creditCardRaw),
      cardExpMon: parseInt(this.state.cardExpMon),
      cardExpYear: parseInt(this.state.cardExpYear),
      cardCVV: parseInt(this.state.cardCVV),
      phoneNumber: parseInt(this.state.phoneNumberRaw) || null,
      emailAddress: this.state.emailAddress,
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
      }
    } else if (prevInput.classList.contains('email') && !inputValue.match(/(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,227}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{2,24})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
      this.setState({
        emailAddressCheck: 'email@domain.com style required!',
        emailAddressVisualFeedback: 'fa-times'
      });
    } else {
      this.setState({
        [currentCheck]: ''
      });
    }
  }

  formCheck() {
    const { name, creditCard, cardExpMon, cardExpYear, cardCVV, phoneNumberRaw, emailAddress, shippingAddress } = this.state;
    if (name.length >= 4 && creditCard.length >= 19 && cardExpMon.length >= 1 && (cardExpYear.length === 2 || cardExpYear.length === 4) && cardCVV.length >= 3 && emailAddress.length >= 6 && shippingAddress.length >= 21) {
      if (emailAddress.match(/(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,227}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{2,24})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
        if (phoneNumberRaw && phoneNumberRaw.length < 10) {
          this.setState({
            submitDisabled: true
          });
          return;
        }
        this.setState({
          submitDisabled: false
        });
        return;
      }
    }
    this.setState({
      submitDisabled: true
    });
  }

  submitCheck() {
    const { name, creditCard, cardExpMon, cardExpYear, cardCVV, phoneNumber, emailAddress, shippingAddress } = this.state;
    if (name.length < 5 || creditCard.length < 16 || cardExpMon.length < 1 || cardExpYear.length < 4 || cardCVV.length < 3 || emailAddress.length < 6 || shippingAddress.length < 21) {
      if (name.length < 5) {
        this.setState({
          nameCheck: 'Full name required!',
          nameVisualFeedback: 'fa-times'
        });
      } if (creditCard.length < 19) {
        this.setState({
          creditCardCheck: 'Credit Card number required!',
          creditCardVisualFeedback: 'fa-times'
        });
      } if (cardExpMon.length < 1) {
        this.setState({
          cardExpMonCheck: 'Exp Mon required!',
          cardExpMonVisualFeedback: 'fa-times'
        });
      } if (cardExpYear.length < 4) {
        this.setState({
          cardExpYearCheck: 'Exp Year required!',
          cardExpYearVisualFeedback: 'fa-times'
        });
      } if (cardCVV.length < 3) {
        this.setState({
          cardCVVCheck: 'CVV required!',
          cardCVVVisualFeedback: 'fa-times'
        });
      } if (shippingAddress.length < 21) {
        this.setState({
          shippingAddressCheck: 'Shipping Address required!',
          shippingAddressVisualFeedback: 'fa-times'
        });
      } if (emailAddress.length < 6) {
        this.setState({
          emailAddressCheck: 'Email Address required!',
          emailAddressVisualFeedback: 'fa-times'
        });
      } if (!emailAddress.match(/(?=[a-z0-9@.!#$%&'*+/=?^_‘{|}~-]{6,254})(?=[a-z0-9.!#$%&'*+/=?^_‘{|}~-]{1,64}@)[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:(?=[a-z0-9-]{1,227}\.)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?=[a-z0-9-]{2,24})[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)) {
        this.setState({
          emailAddressCheck: 'email@domain.com style format required!',
          emailAddressVisualFeedback: 'fa-times'
        });
      }
    } if (phoneNumber) {
      const valueRaw = phoneNumber.split(/[-+ ()]/g).join('');
      const { length } = valueRaw;
      if (length < 10) {
        this.setState({
          phoneNumberCheck: 'Remove or complete',
          phoneNumberVisualFeedback: 'fa-times'
        });
      } else if (length < 1) {
        this.setState({
          phoneNumberCheck: ''
        });
      }
    }
    return true;
  }

  submitButton() {
    return this.state.submitDisabled
      ? <button className="btn btn-secondary disabled" type="submit" >Complete Form</button>
      : <button className="btn btn-success" type="submit" >Place Order</button>;
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
    const submitButton = this.submitButton();
    const cartItemsArray = this.props.cartItems;
    let totalPrice = null;
    cartItemsArray.forEach(cartItem => {
      totalPrice += cartItem.price;
    });
    return (
      <div className="container">
        <div className="row justify-content-center">
          <form className="col-8 align-items-center my-2 px-1 checkout-form" onSubmit={this.handleSubmit}>
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
              <div className="d-flex col-lg-4 col-12 flex-column form-group">
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
                  placeholder="'MM'"
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
                  placeholder="'YY' or 'YYYY'"
                  value={this.state.cardExpYear}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur} />
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
                  placeholder="ex '123'"
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
              <div className="d-flex flex-column col-lg-5 col-7 form-group">
                <label htmlFor="phoneNumber">Phone Number (optional)</label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="phone number"
                  placeholder="281 330 8004"
                  value={this.state.phoneNumber}
                  onChange={this.handleFormChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  maxLength={20} />
                <div className="d-flex input-feedback">
                  <i className={`fas ${phoneNumberResultVisual}`} />
                  <small>{this.state.phoneNumberCheck}</small>
                </div>
              </div>
              <div className="d-flex flex-column col-lg-7 col-12 form-group">
                <label htmlFor="emailAddress">Email</label>
                <input
                  type="text"
                  name="emailAddress"
                  id="emailAddress"
                  className="email"
                  placeholder="email@domain.com"
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
                placeholder={'123 This Rd\nThat City, ST 99999'}
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
            <div className="checkout-button-price">
              {submitButton}
              <h5 className="col-6 col-lg-8 checkout-price">{`Total Price: $${parseFloat(totalPrice / 100).toFixed(2)}`}</h5>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
