import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    const fast10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(fast10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="common-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        key ={product.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;