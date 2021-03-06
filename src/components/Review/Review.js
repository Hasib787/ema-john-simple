import React, {useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([]);

    const removeProduct = (productKey) =>{
            const newCart = cart.filter(pd => pd.key !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts= productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;

        }, []);
        setCart(cartProducts);
    },[]);
    return (
        <div className="common-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                product={pd}
                removeProduct ={removeProduct}
                key ={pd.key}
                ></ReviewItem>)
            }
            </div>
            <Cart cart={cart}></Cart>
        </div>
    );
};

export default Review;