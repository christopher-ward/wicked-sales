import React from 'react';

export default class DisclaimerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAcknowledge: false,
      checkBoxPrompt: false
    };
    this.handleAcknowledge = this.handleAcknowledge.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleAcknowledge() {
    this.setState(state => ({
      modalAcknowledge: !state.modalAcknowledge
    }));
  }

  handleCloseButtonClick() {
    event.preventDefault();
    if (this.state.modalAcknowledge) {
      this.props.setModalView();
      return;
    }
    this.setState({
      checkBoxPrompt: true
    });
  }

  isModalVisible() {
    return this.props.modalView ? '' : 'hidden';
  }

  isCheckPromptVisible() {
    return this.state.checkBoxPrompt ? '' : 'hidden';
  }

  promptVisual() {
    if (this.state.modalAcknowledge) {
      return (
        <>
          <i className="fas fa-check" />
          <small className="go">Proceed!</small>
        </>
      );
    } else {
      return (
        <>
          <i className="fas fa-times" />
          <small>Must acknowledge before proceeding</small>
        </>
      );
    }
  }

  render() {
    const modalView = this.isModalVisible();
    const checkBoxPrompt = this.isCheckPromptVisible();
    return (
      <div className={`${modalView} disclaimer container-fluid`}>
        <div className="disclaimer-message" >
          <div className="contents">
            <p>Welcome! This site is for demonstration purposes only!</p>
            <p>No real purchases will be made!</p>
            <p>Do not enter real payment information!</p>
            <p>Thank you and Enjoy :)</p>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="acknowledge"
              onClick={this.handleAcknowledge} />
            <label className="form-check-label check-text" htmlFor="acknowledge">I acknowledge that this is a Demo site.</label>
          </div>
          <div className={`d-flex ${checkBoxPrompt}`}>
            {this.promptVisual()}
          </div>
          <button
            type="button"
            className="btn btn-secondary exit-modal"
            data-dismiss="modal"
            aria-label="Close"
            onClick={this.handleCloseButtonClick}>Got it!</button>
        </div>
      </div>
    );
  }
}
