import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        //cart
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);
        const counts= productKeys.map(key => savedData[key]);

        console.log(counts);
    })
    return (
        <div>
            <h1>This is review</h1>
        </div>
    );
};

export default Review;