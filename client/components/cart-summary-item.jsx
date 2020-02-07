import React from 'react';

export default function CartSummaryItem(props) {
  const cartItem = props.item;
  const itemImage = cartItem.image;
  const itemName = cartItem.name;
  const itemPrice = cartItem.price;
  const itemShortDesc = cartItem.shortDescription;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img src={itemImage} />
        </div>
        <div className="col">
          <h4 className="card-title">{itemName}</h4>
          <h5>{`$${parseFloat(itemPrice / 100).toFixed(2)}`}</h5>
          <p>{itemShortDesc}</p>
        </div>
      </div>
    </div>
  );
}
