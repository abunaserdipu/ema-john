import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, img, key, price} = props.product;
    document.title = "Order Review";
    
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <button className="main-button" onClick={() => props.removeProduct(key)}>Remove Item</button> 
            </div>
        </div>
    );
};

export default ReviewItem;