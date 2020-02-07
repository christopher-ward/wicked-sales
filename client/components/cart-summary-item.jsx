import React from 'react';

export default function CartSummaryItem(props) {
  const itemImage = props.image;
  const itemName = props.name;
  const itemPrice = props.price;
  const itemShortDesc = props.shortDescription;
  const altText = `Image of ${itemName}`;
  return (
    <div className="row">
      <div className="col">
        <img src={itemImage} alt={altText}/>
      </div>
      <div className="col">
        <h4 className="card-title">{itemName}</h4>
        <h5>{`$${parseFloat(itemPrice / 100).toFixed(2)}`}</h5>
        <p>{itemShortDesc}</p>
      </div>
    </div>
  );
}
