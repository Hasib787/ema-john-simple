import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({}) 

    useEffect(()=>{
        fetch('https://apricot-cupcake-77322.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd=> pd.key === productKey);

    return (
        <div> 
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;