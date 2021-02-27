import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';

const Shop = () => {
    const fast10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(fast10);
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(product=> <li>{product.name}</li>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                    <h3>This is a cart</h3>
            </div>
        </div>
    );
};

export default Shop;