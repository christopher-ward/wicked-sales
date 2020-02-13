import React from 'react';

export default function Header(props) {
  const itemCount = props.cartItemCount;
  return (
    <div className="navbar align-items-center header p-0">
      <div className="col logo d-flex align-items-center my-2">
        <i className="fas fa-dollar-sign pl-4"></i>
        <h1 className="ml-1 mb-1">Wicked Sales</h1>
      </div>
      <div className="col d-flex align-items-center justify-content-end mr-4 my-3">
        <button type="button" className="btn btn-secondary" onClick={() => props.view('cart', {})}>
          View<i className="fas fa-shopping-cart ml-1 mr-2"></i>
          <span className="badge badge-pill badge-light">{itemCount}</span>
        </button>
      </div>
    </div>
  );
}
