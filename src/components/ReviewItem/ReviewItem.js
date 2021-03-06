import React from 'react';

const ReviewItem = (props) => {
    const {img,name, quantity, key, price}= props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '200px'
    }; 
    return (
        <div style={reviewItemStyle} className="review-item">
            <div>
                <img src={img} alt="" />
            </div>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>{price}</small></p>
            <br/>
            <button 
                className="cart-button"
                onClick ={()=>props.removeProduct(key)}
                >Remove</button>
        </div>
    );
};

export default ReviewItem;