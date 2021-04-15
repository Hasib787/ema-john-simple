import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IfDb4BioGMnkIPG0h9x4j8eeFW1xQoO3i0TXhQoEBMcmgp8vcwhH1jkQAqhgysYRZccp6JTcWypP3WHXYUcdjox00vTTu5vRk');


const ProcessPayment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </Elements>
        </div>
    );
};

export default ProcessPayment;