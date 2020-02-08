import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cartItemsArray = props.cartItems;
  let totalPrice = null;
  cartItemsArray.forEach(cartItem => {
    totalPrice += cartItem.price;
  });
  const cartSummaryList = cartItemsArray.map(cartItem =>
    <CartSummaryItem
      key={cartItem.productId}
      image={cartItem.image}
      name={cartItem.name}
      price={cartItem.price}
      shortDescription={cartItem.shortDescription}
    />
  );
  const resetView = () => props.view('catalog', {});
  if (cartSummaryList.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <span className="back ml-3"
              onClick={resetView}>{'< Back to Results'}</span>
            <h1 className="mt-4">My Cart</h1>
            <h4>No Items In Cart</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <span className="back ml-3"
            onClick={resetView}>{'< Back to Results'}</span>
          <h1>My Cart</h1>
        </div>
      </div>
      {cartSummaryList}
      <div className="row">
        <h4>{`Total Price: $${parseFloat(totalPrice / 100).toFixed(2)}`}</h4>
      </div>
    </div>
  );
}
