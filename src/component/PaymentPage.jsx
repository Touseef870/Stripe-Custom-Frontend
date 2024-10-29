// import React, { useEffect, useState } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
// import { useParams, useNavigate } from 'react-router-dom';
// import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
// import Swal from 'sweetalert2';


// const PaymentPage = () => {
//     const { sessionId } = useParams();
//     const [productDetails, setProductDetails] = useState(null);
//     const [productPrice, setProductPrice] = useState(0);
//     const [clientDetails, setClientDetails] = useState(null)
//     const [clientSecret, setClientSecret] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [postalCode, setPostalCode] = useState('');
//     const [isPaid, setIsPaid] = useState('pending');
//     const [paid, setPaid] = useState(false);
//     const [cardHolderName, setCardHolderName] = useState('')
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPaymentDetails = async () => {
//             try {
//                 const response = await fetch(`https://stripe-backend-sand.vercel.app/get-payment-details/${sessionId}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();

//                 setProductPrice(data.data.amount);
//                 setClientDetails(data.data.clientDetails)
//                 setProductDetails(data.data.productDetails);
//                 setIsPaid(data.data.status)
//                 setClientSecret(data.data.clientSecret);
//             } catch (error) {
//                 console.error('Error fetching payment details:', error);
//                 setError('Failed to load payment details. Please try again later.');
//             } finally {
//                 setLoading(false);

//             }
//         };

//         fetchPaymentDetails();
//     }, [sessionId]);


//     // fetch data
//     const res = fetch()

//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         if (!stripe || !elements) {
//             return;
//         }

//         if(isPaid == 'completed' ){
//             setError('Payment is already completed!')
//             return;
//         }

//         setTimeout(() => {
//             setLoading(false);
//             setPaid(true); // Show "Paid" after processing

//             // After 2 seconds, reset paid state back to false
//             setTimeout(() => {
//                 setPaid(false);
//             }, 2000);

//         }, 2000); // Simulating 2-second processing time

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const cardExpiryElement = elements.getElement(CardExpiryElement);
//         const cardCvcElement = elements.getElement(CardCvcElement);

//         if (!cardNumberElement || !cardExpiryElement || !cardCvcElement || !postalCode) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Please fill your card details!',
//             })
//             return;
//         }


//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: cardNumberElement,
//                 billing_details: {
//                     address: {
//                         postal_code: postalCode,
//                     },
//                 },
//             },
//         });

//         // console.log("elements=>", elements)
//         // console.log("cardNumberElement=>", cardNumberElement)
//         // console.log("cardExpiryElement=>", cardExpiryElement)
//         // console.log("cardCvcElement=>", cardCvcElement)


//         if (error) {
//             console.error('Payment error:', error.message);
//             setError('Card details are invalid!.');
//         } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//             try {
//                 console.log("paymentIntent=>", paymentIntent.status)
//                 const response = await fetch(`https://stripe-backend-sand.vercel.app/api/create-payment/${sessionId}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ sessionId }),
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to update payment status');
//                 }

//                 const result = await response.json();
//                 if (result.success) {
//                     setIsPaid('complete');
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Payment Completed Successfully',
//                         text: 'Thank you for your payment!',
//                     });
//                     setTimeout(() => {
//                         window.location.reload()
//                     }, 4000);
//                 }

//             } catch (err) {
//                 console.error('Error updating payment status:', err);
//             }
//         }
//     };


//     if (loading) return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid"></div>
//         </div>

//     )

//     console.log("Status=>", isPaid);
//     // console.log("sessionId=>", sessionId)
//     // console.log("productDetails=>", productDetails)



//     return (
//         <div className="h-full bg-slate-100 p-16">
//             {productDetails && productDetails.product_image && productDetails.product_title && productDetails.product_description && productPrice ? (
//                 <>
//                     <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-5 shadow-lg rounded-2xl bg-white'>
//                         <div className="flex-1 bg-blue-950 p-6 md:p-10 rounded-l-2xl shadow-lg">
//                             <img
//                                 className="w-full max-h-80 object-cover rounded-xl shadow-xl mb-6"
//                                 src={productDetails.product_image}
//                                 alt={productDetails.product_title}
//                             />
//                             <div className="space-y-8">

//                                 {/* Customer Details Section */}
//                                 <div>
//                                     <h2 className="text-white text-3xl font-semibold mb-3">Customer Details</h2>
//                                     <p className="text-white text-xl pl-2 ">
//                                         <span className="font-semibold text-blue-400">Customer Email:</span> {clientDetails.clientEmail}
//                                     </p>
//                                     <p className="text-white text-xl pl-2 ">
//                                         <span className="font-semibold text-blue-400">Name:</span> {clientDetails.clientName}
//                                     </p>

//                                     {clientDetails.clientNum && (
//                                         <p className="text-white text-xl pl-2">
//                                             <span className="font-semibold text-blue-400">Contact Number: </span>  {clientDetails.clientNum}
//                                         </p>
//                                     )}

//                                 </div>


//                                 {/* Brand Details Section */}
//                                 <div>
//                                     <h2 className="text-white text-3xl font-semibold mb-3">Details</h2>
//                                     <p className="text-white text-xl     mb-2">
//                                         <span className="font-semibold text-blue-400 pl-2">Description:</span> {productDetails.product_description}
//                                     </p>
//                                 </div>


//                                 <div>
//                                     <h2 className='text-white text-3xl font-semibold mb-2'>Total</h2>
//                                     <p className="text-white text-4xl mb-2 font-bold">
//                                         USD: {productPrice}
//                                     </p>
//                                 </div>

//                                 {/* Brand Title */}
//                                 <h1 className="text-4xl text-center font-bold  pt-12 text-white">VEHWARE LLC.</h1>



//                             </div>
//                         </div>


//                         <div className='flex-1 p-5 md:p-10 flex flex-col justify-center'>

//                             <h1 className='text-5xl font-bold py-10 text-center flex justify-between items-center'>
//                                 <span className="flex items-center">
//                                     {/* <FontAwesomeIcon icon={faLock} className='h-10 w-10' /> */}
//                                     Payment
//                                 </span>
//                                 <div className='ml-4'>
//                                     <img src='/public/safety.png' className='h-12 rounded-md' />
//                                 </div>
//                             </h1>

//                             <form onSubmit={handleSubmit}>
//                                 {error && <p className="text-red-600 text-center py-2 bg-red-200 rounded-3xl">{error}</p>}

//                                 {/* Card Holder Name */}
//                                 <div className="bg-white p-5">
//                                     <label className="block mb-2 font-semibold text-gray-700">Card Holder Name</label>
//                                     <input
//                                         type="text"
//                                         value={cardHolderName}
//                                         onChange={(e) => setCardHolderName(e.target.value)}
//                                         className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
//                                         placeholder="Enter card holder's name"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Card Number */}
//                                 <div className="bg-white p-5">
//                                     <label className="block mb-2 font-semibold text-gray-700">Card Number</label>
//                                     <CardNumberElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
//                                 </div>

//                                 {/* Expiry Date and CVC */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="bg-white p-5">
//                                         <label className="block mb-2 font-semibold text-gray-700">Expiry Date</label>
//                                         <CardExpiryElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
//                                     </div>
//                                     <div className="bg-white p-5">
//                                         <label className="block mb-2 font-semibold text-gray-700">CVC</label>
//                                         <CardCvcElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
//                                     </div>
//                                 </div>

//                                 {/* Postal Code */}
//                                 <div className="bg-white p-5">
//                                     <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
//                                     <input
//                                         minLength={1}
//                                         maxLength={10}
//                                         type="text"
//                                         value={postalCode}
//                                         onChange={(e) => setPostalCode(e.target.value)}
//                                         className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
//                                         placeholder="Enter your Zip code"
//                                     />
//                                 </div>

//                                 {/* Submit Button */}
//                                 <button
//                                     type="submit"
//                                     disabled={isPaid == 'complete' || !stripe || loading || paid }
//                                     className={`w-full py-3 px-4 mt-8 font-semibold text-white rounded-md transition-colors duration-300 ${!stripe || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//                                 >
//                                     {loading ? (
//                                         <div className="flex items-center justify-center">
//                                             {paid ? 'Paid' : 'Processing'}
//                                         </div>
//                                     ) : (
//                                         <span className="flex items-center justify-center">
//                                             <FontAwesomeIcon icon={faLock} className='h-4 w-4 mr-2' />
//                                             Pay Now
//                                         </span>
//                                     )}
//                                 </button>
//                             </form>
//                             {/* Payment Safety Logos */}
//                             <div className="flex justify-center mt-6 space-x-6">
//                                 {/* Place payment safety logos here */}
//                                 <img src='/public/checkout.jpeg' className='h-20 rounded-md' />
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             ) : null}

//             {isPaid === 'completed' ? (
//                 <div className="flex justify-center mt-4">
//                 <div className="bg-red-600 shadow-lg rounded-lg p-4 max-w-md text-center">
//                     <div className="flex items-center flex-col justify-center">
//                         <p className="text-lg font-semibold text-white">
//                             This transaction has already been processed. If you feel this is incorrect, please contact the relevant sales representative.
//                         </p>
//                     </div>
//                 </div>
//             </div>
            
//             ) : <div></div>}


//             {error && (
//                 <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                     <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 max-w-md flex items-center">
//                         <ExclamationCircleIcon className="h-6 w-6 mr-3" />
//                         <p className="text-sm font-semibold">{error}</p>
//                     </div>
//                 </div>
//             )}

//         </div>

//     );
// };

// export default PaymentPage;


import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import Swal from 'sweetalert2';


const PaymentPage = () => {
    const { sessionId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [productPrice, setProductPrice] = useState(0);
    const [clientDetails, setClientDetails] = useState(null)
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [isPaid, setIsPaid] = useState('pending');
    const [paid, setPaid] = useState(false);
    const [cardHolderName, setCardHolderName] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`https://stripe-backend-sand.vercel.app/api/get-payment-details/${sessionId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("data=>", data)

                setProductPrice(data.data.amount);
                setClientDetails(data.data.clientDetails)
                setProductDetails(data.data.productDetails);
                setIsPaid(data.data.status)
                setClientSecret(data.data.clientSecret);
            } catch (error) {
                console.error('Error fetching payment details:', error);
                setError('Failed to load payment details. Please try again later.');
            } finally {
                setLoading(false);

            }
        };

        fetchPaymentDetails();
    }, [sessionId]);


    // fetch data
    const res = fetch()

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        if(isPaid == 'completed' ){
            setError('Payment is already completed!')
            return;
        }

        setTimeout(() => {
            setLoading(false);
            setPaid(true); // Show "Paid" after processing

            // After 2 seconds, reset paid state back to false
            setTimeout(() => {
                setPaid(false);
            }, 2000);

        }, 2000); // Simulating 2-second processing time

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement || !postalCode) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill your card details!',
            })
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

        // console.log("elements=>", elements)
        // console.log("cardNumberElement=>", cardNumberElement)
        // console.log("cardExpiryElement=>", cardExpiryElement)
        // console.log("cardCvcElement=>", cardCvcElement)


        if (error) {
            console.error('Payment error:', error.message);
            setError('Card details are invalid!.');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                console.log("paymentIntent=>", paymentIntent.status)
                const response = await fetch(`https://stripe-backend-sand.vercel.app/api/create-payment/${sessionId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sessionId }),
                });
                if (!response.ok) {
                    throw new Error('Failed to update payment status');
                }

                const result = await response.json();
                if (result.success) {
                    setIsPaid('complete');
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Completed Successfully',
                        text: 'Thank you for your payment!',
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 4000);
                }

            } catch (err) {
                console.error('Error updating payment status:', err);
            }
        }
    };


    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid"></div>
        </div>

    )

    console.log("Status=>", isPaid);
    // console.log("sessionId=>", sessionId)
    console.log("productDetails=>", productDetails)



    return (
        <div className="h-full bg-slate-100 p-16">
            {productDetails && productDetails.product_image && productDetails.product_title && productDetails.product_description && productPrice ? (
                <>
                    <div className='flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-5 shadow-lg rounded-2xl bg-white'>
                        <div className="flex-1 bg-blue-950 p-6 md:p-10 rounded-l-2xl shadow-lg">
                            <img
                                className="w-full max-h-80 object-cover rounded-xl shadow-xl mb-6"
                                src={productDetails.product_image}
                                alt={productDetails.product_title}
                            />
                            <div className="space-y-8">

                                {/* Customer Details Section */}
                                <div>
                                    <h2 className="text-white text-3xl font-semibold mb-3">Customer Details</h2>
                                    <p className="text-white text-xl pl-2 ">
                                        <span className="font-semibold text-blue-400">Customer Email:</span> {clientDetails.clientEmail}
                                    </p>
                                    <p className="text-white text-xl pl-2 ">
                                        <span className="font-semibold text-blue-400">Name:</span> {clientDetails.clientName}
                                    </p>

                                    {clientDetails.clientNum && (
                                        <p className="text-white text-xl pl-2">
                                            <span className="font-semibold text-blue-400">Contact Number: </span>  {clientDetails.clientNum}
                                        </p>
                                    )}

                                </div>


                                {/* Brand Details Section */}
                                <div>
                                    <h2 className="text-white text-3xl font-semibold mb-3">Details</h2>
                                    <p className="text-white text-xl     mb-2">
                                        <span className="font-semibold text-blue-400 pl-2">Description:</span> {productDetails.product_description}
                                    </p>
                                </div>


                                <div>
                                    <h2 className='text-white text-3xl font-semibold mb-2'>Total</h2>
                                    <p className="text-white text-4xl mb-2 font-bold">
                                        USD: {productPrice}
                                    </p>
                                </div>

                                {/* Brand Title */}
                                <h1 className="text-4xl text-center font-bold  pt-12 text-white">VEHWARE LLC.</h1>



                            </div>
                        </div>


                        <div className='flex-1 p-5 md:p-10 flex flex-col justify-center'>

                            <h1 className='text-5xl font-bold py-10 text-center flex justify-between items-center'>
                                <span className="flex items-center">
                                    {/* <FontAwesomeIcon icon={faLock} className='h-10 w-10' /> */}
                                    Payment
                                </span>
                                <div className='ml-4'>
                                    <img src='/public/safety.png' className='h-12 rounded-md' />
                                </div>
                            </h1>

                            <form onSubmit={handleSubmit}>
                                {error && <p className="text-red-600 text-center py-2 bg-red-200 rounded-3xl">{error}</p>}

                                {/* Card Holder Name */}
                                <div className="bg-white p-5">
                                    <label className="block mb-2 font-semibold text-gray-700">Card Holder Name</label>
                                    <input
                                        type="text"
                                        value={cardHolderName}
                                        onChange={(e) => setCardHolderName(e.target.value)}
                                        className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                        placeholder="Enter card holder's name"
                                        required
                                    />
                                </div>

                                {/* Card Number */}
                                <div className="bg-white p-5">
                                    <label className="block mb-2 font-semibold text-gray-700">Card Number</label>
                                    <CardNumberElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                </div>

                                {/* Expiry Date and CVC */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-5">
                                        <label className="block mb-2 font-semibold text-gray-700">Expiry Date</label>
                                        <CardExpiryElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                    </div>
                                    <div className="bg-white p-5">
                                        <label className="block mb-2 font-semibold text-gray-700">CVC</label>
                                        <CardCvcElement className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm" />
                                    </div>
                                </div>

                                {/* Postal Code */}
                                <div className="bg-white p-5">
                                    <label className="block mb-2 font-semibold text-gray-700">Zip Code</label>
                                    <input
                                        minLength={1}
                                        maxLength={10}
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className="w-full border rounded-md p-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
                                        placeholder="Enter your Zip code"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isPaid == 'complete' || !stripe || loading || paid }
                                    className={`w-full py-3 px-4 mt-8 font-semibold text-white rounded-md transition-colors duration-300 ${!stripe || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            {paid ? 'Paid' : 'Processing'}
                                        </div>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <FontAwesomeIcon icon={faLock} className='h-4 w-4 mr-2' />
                                            Pay Now
                                        </span>
                                    )}
                                </button>
                            </form>
                            {/* Payment Safety Logos */}
                            <div className="flex justify-center mt-6 space-x-6">
                                {/* Place payment safety logos here */}
                                <img src='/public/checkout.jpeg' className='h-20 rounded-md' />
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {isPaid === 'completed' ? (
                <div className="flex justify-center mt-4">
                <div className="bg-red-600 shadow-lg rounded-lg p-4 max-w-md text-center">
                    <div className="flex items-center flex-col justify-center">
                        <p className="text-lg font-semibold text-white">
                            This transaction has already been processed. If you feel this is incorrect, please contact the relevant sales representative.
                        </p>
                    </div>
                </div>
            </div>
            
            ) : <div></div>}


            {error && (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 max-w-md flex items-center">
                        <ExclamationCircleIcon className="h-6 w-6 mr-3" />
                        <p className="text-sm font-semibold">{error}</p>
                    </div>
                </div>
            )}

        </div>

    );
};

export default PaymentPage;
