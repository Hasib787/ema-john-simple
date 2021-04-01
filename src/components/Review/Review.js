import React, {useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () =>{
        history.push('/shipment');
    }

    const removeProduct = (productKey) =>{
            const newCart = cart.filter(pd => pd.key !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
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
                <button onClick={handleProceedCheckout} className="cart-button">Proceed Checkout</button>
            </Cart>
        </div>
    );
};

export default Review;