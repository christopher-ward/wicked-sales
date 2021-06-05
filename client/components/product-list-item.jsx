import React from 'react';

export default function ProductListItem(props) {
  const altText = `Image of ${props.name}`;
  const newViewObjName = 'details';
  const newViewObjParams = {
    productId: props.id
  };
  const productView = () => props.view(newViewObjName, newViewObjParams);
  const enterKeyListener = event => {
    if (event.key === 'Enter') {
      props.view(newViewObjName, newViewObjParams);
    }
  };
  return (
    <div className="col-md-6 col-lg-4 col-xl-4"
      onClick={productView}
      onKeyPress={enterKeyListener}>
      <div className="card justify-content-between my-3">
        <img src={props.image} className="card-img-top mt-3" alt={altText} />
        <div className="card-body" tabIndex="0">
          <h2 className="card-title">{props.name}</h2>
          <h3>{`$${parseFloat(props.price / 100).toFixed(2)}`}</h3>
          <p>{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
