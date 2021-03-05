import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity}= props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '200px'
    }; 
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="cart-button">Review</button>
        </div>
    );
};

export default ReviewItem;