import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props.product.name);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>by: {seller}</small></p>
                <p>$ {price}</p>
                <p>Only {stock} left in stock - Order soon</p>
            </div>
        </div>
    );
};

export default Product;