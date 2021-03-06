import React, {useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);


    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

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

        let thankYou;
        if (orderPlaced) {
            thankYou =<img src={happyImage} alt=""/>
        }
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
            {thankYou}
            </div>
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="cart-button">Place Order</button>
            </Cart>
        </div>
    );
};

export default Review;