import React from 'react';

export default function CartSummaryItem(props) {
  const itemImage = props.image;
  const itemName = props.name;
  const itemPrice = props.price;
  const itemShortDesc = props.shortDescription;
  const altText = `Image of ${itemName}`;
  return (
    <div className="row no-gutters mt-3 details align-items-center">
      <div className="col-sm-6 col-lg-5 m-4 justify-content-center">
        <img className="card-img" src={itemImage} alt={altText}/>
      </div>
      <div className="item-info col-sm-4 col-lg-6">
        <h4 className="card-title">{itemName}</h4>
        <h5>{`$${parseFloat(itemPrice / 100).toFixed(2)}`}</h5>
        <p>{itemShortDesc}</p>
      </div>
    </div>
  );
}
