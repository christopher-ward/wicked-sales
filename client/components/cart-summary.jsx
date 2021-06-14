import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  let totalPrice = null;
  const resetView = () => props.view('catalog', {});
  const cartItemsArray = props.cartItems;
  cartItemsArray.forEach(cartItem => {
    totalPrice += cartItem.price;
  });
  const cartSummaryList = cartItemsArray.map(cartItem =>
    <CartSummaryItem
      key={cartItemsArray.indexOf(cartItem)}
      image={cartItem.image}
      name={cartItem.name}
      price={cartItem.price}
      shortDescription={cartItem.shortDescription}
    />
  );
  if (cartSummaryList.length === 0) {
    return (
      <div className="container my-3 summary">
        <div className="row">
          <div className="col">
            <p className="back my-0"
              tabIndex="0"
              onClick={resetView}>{'< Back to Catalog'}</p>
            <h1 className="mt-3">My Cart</h1>
            <h2 className="mt-3 text-center">No Items In Cart</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mt-3 summary">
        <div className="row">
          <div className="col">
            <p className="back my-0"
              tabIndex="0"
              onClick={resetView}>{'< Back to Catalog'}</p>
            <h1 className="mt-3 ">My Cart</h1>
          </div>
        </div>
        {cartSummaryList}
      </div>
      <div className="container-fluid p-2 checkout align-items-center">
        <div className="row justify-content-center align-items-center">
          <h2 className="col-6 col-lg-8 m-0 p-0">{`Total Price: $${parseFloat(totalPrice / 100).toFixed(2)}`}</h2>
          <button type="button" className=" btn btn-success pl-3" onClick={() => props.view('checkout', {})}>
            Checkout<i className="fas fa-cash-register mx-2"></i>
          </button>
        </div>
      </div>
    </>
  );
}
