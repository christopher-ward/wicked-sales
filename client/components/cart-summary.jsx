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
            <p className="back"
              onClick={resetView}>{'< Back to Results'}</p>
            <h1 className="mt-3">My Cart</h1>
            <h2 className="mt-3 text-center">No Items In Cart</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container my-3 summary">
      <div className="row">
        <div className="col">
          <p className="back"
            onClick={resetView}>{'< Back to Results'}</p>
          <h1 className="mt-3 ">My Cart</h1>
        </div>
      </div>
      {cartSummaryList}
      <div className="row m-4">
        <h4>{`Total Price: $${parseFloat(totalPrice / 100).toFixed(2)}`}</h4>
      </div>
    </div>
  );
}
