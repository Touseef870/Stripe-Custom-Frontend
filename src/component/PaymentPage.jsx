import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom';

// Load Stripe
const stripePromise = loadStripe('pk_test_51Q5CQjBSRlxFwzyWZZr67eMkwml3WUCZdRg4bcW5mtBx1NffoI3wDxNJ7QPAzEVUczP8ntAnMPmlDYeTyWEBpjl100xLHDUUps');

const PaymentPage = () => {
    const { sessionId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Fetch product details and client secret
    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`https://stripecustombackend.netlify.app/get-payment-details/${sessionId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductDetails(data.productDetails);
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Error fetching payment details:', error);
                setError('Failed to load payment details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentDetails();
    }, [sessionId]);

    // Handle Stripe Payment submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            setError('Card details are not available.');
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement,
                billing_details: {
                    address: {
                        postal_code: postalCode,
                    },
                },
            },
        });

        if (error) {
            console.error('Payment error:', error.message);
            setError('Payment failed. Invalid Card Detail.');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
            navigate('/success');
        }
    };

    if (loading) return <p>Loading payment details...</p>;
    if (error) {
        return <p className="text-red-600 text-center">{error}</p>;
    }


    return (
        <div className="h-full">
            {productDetails ? (
                <>
                    <h1 className='text-5xl font-bold my-5 mb-10 underline italic text-center'>Payment Form</h1>

                    <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-5 shadow-lg border rounded-xl p-5 md:p-10'>
                        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                            <img className="w-full h-72 object-cover" src={productDetails.image} alt={productDetails.name} />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product: {productDetails.title}</h2>
                                <p className="text-gray-600 mb-4"><span className="font-medium">Description:</span> {productDetails.description}</p>
                                <p className="text-3xl font-bold text-blue-600 mb-6">Price: ${productDetails.amount / 100}</p>

                                <div className="border-t border-gray-300 pt-4">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Agent Details</h3>
                                    <p className="text-gray-600 mb-2"><span className="font-medium">Email:</span> {productDetails.agentEmail}</p>
                                    <p className="text-gray-600 mb-2"><span className="font-medium">Number:</span> {productDetails.agentNum}</p>
                                    <p className="text-gray-600 mb-4"><span className="font-medium">Name:</span> {productDetails.agentName}</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex-1'>
                            {error && <p className="text-red-600 text-center py-2 bg-red-200 rounded-3xl">{error}</p>}
                            {/* Stripe Card Form */}
                            <form onSubmit={handleSubmit} className="space-y-6 border border-gray-300 p-6 rounded-lg shadow-lg bg-white transition-transform duration-300">
                                <div className="bg-white p-5 rounded-lg shadow">
                                    <label className="block mb-2 font-semibold text-gray-700">Card Number</label>
                                    <CardNumberElement className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-5 rounded-lg shadow">
                                        <label className="block mb-2 font-semibold text-gray-700">Expiry Date</label>
                                        <CardExpiryElement className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                    </div>
                                    <div className="bg-white p-5 rounded-lg shadow">
                                        <label className="block mb-2 font-semibold text-gray-700">CVC</label>
                                        <CardCvcElement className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-lg shadow">
                                    <label className="block mb-2 font-semibold text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                        placeholder="Enter your postal code"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!stripe || loading}
                                    className={`w-full py-3 px-4 font-semibold text-white rounded-md transition-colors duration-300 ${!stripe || loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    Pay Now
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className='mt-12'>
                        <h1 className='text-5xl font-bold text-center'>VEHWARE</h1>
                        <hr className='my-4 mx-10 bg-black' />
                        <h1 className='text-xs text-center'>©2024. All Right Reserved</h1>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center">No product details available.</p>
            )}
        </div>

    );
};

export default PaymentPage;
