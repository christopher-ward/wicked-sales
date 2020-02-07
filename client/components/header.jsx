import React from 'react';

export default function Header(props) {
  const itemCount = props.cartItemCount;
  return (
    <div className="navbar align-items-center header">
      <div className="col d-flex align-items-center justify-content-start">
        <i className="fas fa-dollar-sign ml-4"></i>
        <h1 className="ml-1">Wicked Sales</h1>
      </div>
      <div className="col d-flex align-items-center justify-content-end mr-4">
        <button type="button" className="btn btn-success " onClick={() => props.view('cart', {})}>
          View<i className="fas fa-shopping-cart ml-1 mr-2"></i>
          <span className="badge badge-pill badge-primary">{itemCount}</span>
        </button>
      </div>
    </div>
  );
}
