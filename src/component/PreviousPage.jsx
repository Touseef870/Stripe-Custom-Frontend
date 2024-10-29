// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { initializeApp } from "firebase/app";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy, faSquareUpRight } from '@fortawesome/free-solid-svg-icons';
// import Loader from './Loader';
// import Swal from 'sweetalert2';

// // const brands = [
// //     {
// //         id: 1,
// //         title: 'Brand A',
// //         logo: 'https://images.unsplash.com/photo-1719937206109-7f4e933230c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// //     },
// //     {
// //         id: 2,
// //         title: 'Brand B',
// //         logo: 'https://images.unsplash.com/photo-1610415304248-5fd40f3e2263?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// //     },
// // ];

// const brands = [
//     { id: 1, title: "Red Logo Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-01.png?alt=media&token=562e720d-b49d-4fa0-b25d-ad5dec0f6b22" },
//     { id: 2, title: "Certified Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-02.png?alt=media&token=b18b642c-7346-4e3f-9b29-338e253c0933" },
//     { id: 3, title: "Neon Tech", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-03.png?alt=media&token=a570cf1a-cfc6-402f-800d-442cb76a78f6" },
//     { id: 4, title: "Rex Logos", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-04.png?alt=media&token=f91b8f59-27ef-4688-8993-468c5f569bed" },
//     { id: 5, title: "Meg Logos", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-05.png?alt=media&token=a615264d-4a30-4505-8725-475189b74cba" },
//     { id: 6, title: "Logo March", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-06.png?alt=media&token=22b68cb6-52e8-47e3-8b50-0e242a32c8fc" },
//     { id: 7, title: "The Neon Tech", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-07.png?alt=media&token=336835bb-13b5-483d-ac59-956424989b65" },
//     { id: 8, title: "Design Agency", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-08.png?alt=media&token=7f7853d7-a946-4eee-aeb6-23be38959f48" },
//     { id: 9, title: "Certified Logo Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-09.png?alt=media&token=d6177b25-8fcf-40cf-b53d-c2598df7c17f" },
//     { id: 10, title: "Logo Toons", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-10.png?alt=media&token=7c089eed-a9e5-4d14-8818-b8d919f375a2" },
//     { id: 11, title: "Logo Puffs", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-11.png?alt=media&token=2d8fea0a-c712-4a77-b1ab-3bee528b524a" },
//     { id: 12, title: "Beetle Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-12.png?alt=media&token=e783b036-a043-4c9f-8775-4c75be38e781" },
//     { id: 13, title: "Monkey Designslab", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-13%20(1).png?alt=media&token=c7213e2c-16ff-4e2a-8513-d58d4b2e5352" },
//     { id: 14, title: "Design Agency", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-14.png?alt=media&token=164bec84-9819-40e7-9835-526fd21f78e5" },
//     { id: 15, title: "Logo Gems", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-15.png?alt=media&token=952f33b5-4d8a-4c87-89b0-306ec053ae9b" },
//     { id: 16, title: "Vehware 2.0", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-16.png?alt=media&token=8db3f83d-2d4e-4988-bd4e-3d4e1cdaaace" },
//     { id: 17, title: "Design69", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-17%20(1).png?alt=media&token=c77d1dbc-7eab-4186-b5a7-e164ccefd95e" },
//     { id: 18, title: "Webtach", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-18.png?alt=media&token=9e76afb2-79ea-4d37-b409-9e22110d656c" },
// ];


// const PreviousPage = () => {
//     const [selectedBrand, setSelectedBrand] = useState(null);
//     const [productDesc, setProductDesc] = useState('');
//     const [brandAmount, setBrandAmount] = useState("");
//     const [clientName, setClientName] = useState("");
//     const [clientNum, setClientNum] = useState("");
//     const [clientEmail, setClientEmail] = useState("");
//     const [URL, setURL] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [isCopied, setIsCopied] = useState(false);
//     const [linkGenerated, setLinkGenerated] = useState(false);

//     const navigate = useNavigate();

//     const handleBrandSelect = (e) => {
//         const brandId = parseInt(e.target.value);
//         const brand = brands.find(b => b.id === brandId);
//         setSelectedBrand(brand);
//         setLinkGenerated(false)
//     };

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         setLinkGenerated(false)

//         // Prevent re-calling the API if the link has already been generated
//         if (linkGenerated) return;

//         setIsProcessing(true);

//         const updatedBrandData = {
//             title: selectedBrand.title,
//             description: productDesc,
//             amount: brandAmount * 100 ,
//             image: selectedBrand.url,
//             clientName,
//             clientNum,
//             clientEmail,
//         };

//         try {
//             const paymentResponse = await fetch('https://stripe-backend-sand.vercel.app/api/generate-payment', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedBrandData),
//             });

//             if (paymentResponse.ok) {
//                 const res = await paymentResponse.json();
//                 if (res.data.data.sessionId) {
//                     setURL(`https://stripe-form-frontend.vercel.app/payment/${res.data.data.sessionId}`);
//                     Swal.fire({
//                         title: "Good job!",
//                         text: "Successfully Generated Link",
//                         icon: "success"
//                     });
//                     setLinkGenerated(true); // Set linkGenerated to true
//                 }
//             } else {
//                 console.error('Request failed:', paymentResponse.status);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "Something went wrong!",
//             });
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const handleCopy = () => {
//         navigator.clipboard.writeText(URL);
//         setIsCopied(true);
//         setTimeout(() => {
//             setIsCopied(false);
//         }, 2000);
//     };

//     const handleRedirect = () => {
//         window.open(URL, '_blank');
//     };


//     return (
//         <form className="max-w-4xl w-full mx-auto mt-10 border p-8 rounded-xl bg-white shadow-lg" onSubmit={handlePayment}>
//             <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Brand</h2>

//             <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
//                 <select
//                     onChange={handleBrandSelect}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200"
//                     required
//                 >
//                     <option value="">Select a brand</option>
//                     {brands.map((brand) => (
//                         <option key={brand.id} value={brand.id}>{brand.title}</option>
//                     ))}
//                 </select>
//             </div>

//             {selectedBrand && (
//                 <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                     <img src={selectedBrand.url} alt="Brand Logo" className="h-48 w-auto mx-auto rounded-md border bg-black border-black" />
//                     <h3 className="text-xl font-semibold text-center pt-4"> {selectedBrand.title}</h3>
//                 </div>
//             )}

//             <div className='mb-4'>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea placeholder='Enter Your Product Description '
//                     value={productDesc}
//                     className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200'
//                     rows="4"
//                     onChange={(e) => setProductDesc(e.target.value)} ></textarea>
//             </div>

//             <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
//                 <input
//                     type="number"
//                     placeholder="Enter amount"
//                     value={brandAmount}
//                     onChange={(e) => setBrandAmount(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200"
//                     required
//                 />
//             </div>

//             <h2 className="text-3xl pt-6 font-bold mb-6 text-center text-gray-800">Client Details</h2>
//             <div className="mb-8 flex flex-col gap-6">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
//                         <input
//                             type="text"
//                             placeholder="Enter client name"
//                             value={clientName}
//                             onChange={(e) => setClientName(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200"
//                             required
//                         />
//                     </div>
//                     <div className="flex-1">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Client Number</label>
//                         <input
//                             type="number"
//                             placeholder="Enter client number"
//                             value={clientNum}
//                             onChange={(e) => setClientNum(e.target.value)}
//                             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
//                     <input
//                         type="email"
//                         placeholder="Enter client email"
//                         value={clientEmail}
//                         onChange={(e) => setClientEmail(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-200"
//                         required
//                     />
//                 </div>
//             </div>

//             <button
//                 type="submit"
//                 className={`w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition ease-in-out duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} ${linkGenerated ? 'opacity-50 cursor-not-allowed  ' : ''}`}
//                 disabled={isProcessing || linkGenerated}>
//                 {isProcessing ? <Loader text={'Processing'} /> : "Process"}
//             </button>

//             {linkGenerated && (
//                 <div className="mt-6 flex flex-col items-center">
//                     <p className="text-sm text-gray-600">Payment Link Generated!</p>
//                     <div className="flex items-center mt-2">
//                         <button onClick={handleCopy} className="p-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 transition duration-200">
//                             <FontAwesomeIcon icon={faCopy} /> {isCopied ? "Copied!" : "Copy Link"}
//                         </button>
//                         <button onClick={handleRedirect} className="ml-2 p-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200">
//                             <FontAwesomeIcon icon={faSquareUpRight} /> Open Link
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </form>
//     );
// };

// export default PreviousPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faSquareUpRight } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import Swal from 'sweetalert2';
import axios from 'axios';

// const brands = [
//     {
//         id: 1,
//         title: 'Brand A',
//         logo: 'https://images.unsplash.com/photo-1719937206109-7f4e933230c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//     },
//     {
//         id: 2,
//         title: 'Brand B',
//         logo: 'https://images.unsplash.com/photo-1610415304248-5fd40f3e2263?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//     },
// ];

const brands = [
    { id: 1, title: "Red Logo Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-01.png?alt=media&token=562e720d-b49d-4fa0-b25d-ad5dec0f6b22" },
    { id: 2, title: "Certified Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-02.png?alt=media&token=b18b642c-7346-4e3f-9b29-338e253c0933" },
    { id: 3, title: "Neon Tech", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-03.png?alt=media&token=a570cf1a-cfc6-402f-800d-442cb76a78f6" },
    { id: 4, title: "Rex Logos", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-04.png?alt=media&token=f91b8f59-27ef-4688-8993-468c5f569bed" },
    { id: 5, title: "Meg Logos", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-05.png?alt=media&token=a615264d-4a30-4505-8725-475189b74cba" },
    { id: 6, title: "Logo March", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-06.png?alt=media&token=22b68cb6-52e8-47e3-8b50-0e242a32c8fc" },
    { id: 7, title: "The Neon Tech", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-07.png?alt=media&token=336835bb-13b5-483d-ac59-956424989b65" },
    { id: 8, title: "Design Agency", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-08.png?alt=media&token=7f7853d7-a946-4eee-aeb6-23be38959f48" },
    { id: 9, title: "Certified Logo Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-09.png?alt=media&token=d6177b25-8fcf-40cf-b53d-c2598df7c17f" },
    { id: 10, title: "Logo Toons", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-10.png?alt=media&token=7c089eed-a9e5-4d14-8818-b8d919f375a2" },
    { id: 11, title: "Logo Puffs", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-11.png?alt=media&token=2d8fea0a-c712-4a77-b1ab-3bee528b524a" },
    { id: 12, title: "Beetle Design", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-12.png?alt=media&token=e783b036-a043-4c9f-8775-4c75be38e781" },
    { id: 13, title: "Monkey Designslab", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-13%20(1).png?alt=media&token=c7213e2c-16ff-4e2a-8513-d58d4b2e5352" },
    { id: 14, title: "Design Agency", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-14.png?alt=media&token=164bec84-9819-40e7-9835-526fd21f78e5" },
    { id: 15, title: "Logo Gems", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-15.png?alt=media&token=952f33b5-4d8a-4c87-89b0-306ec053ae9b" },
    { id: 16, title: "Vehware 2.0", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-16.png?alt=media&token=8db3f83d-2d4e-4988-bd4e-3d4e1cdaaace" },
    { id: 17, title: "Design69", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-17%20(1).png?alt=media&token=c77d1dbc-7eab-4186-b5a7-e164ccefd95e" },
    { id: 18, title: "Webtach", url: "https://firebasestorage.googleapis.com/v0/b/vehware-logo.appspot.com/o/office%20logos-18.png?alt=media&token=9e76afb2-79ea-4d37-b409-9e22110d656c" },
];


const PreviousPage = () => {
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [productDesc, setProductDesc] = useState('');
    const [brandAmount, setBrandAmount] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientNum, setClientNum] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [URL, setURL] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [linkGenerated, setLinkGenerated] = useState(false);

    const navigate = useNavigate();

    const handleBrandSelect = (e) => {
        const brandId = parseInt(e.target.value);
        const brand = brands.find(b => b.id === brandId);
        setSelectedBrand(brand);
        setLinkGenerated(false)
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setLinkGenerated(false)

        // Prevent re-calling the API if the link has already been generated
        if (linkGenerated) return;

        setIsProcessing(true);

        const updatedBrandData = {
            title: selectedBrand.title,
            description: productDesc,
            amount: brandAmount * 100,
            image: selectedBrand.url,
            clientName,
            clientNum,
            clientEmail,
        };

        console.log(updatedBrandData)
        try {
            const paymentResponse = await axios.post(
                'https://stripe-backend-sand.vercel.app/api/generate-payment',
                updatedBrandData,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const paymentData = paymentResponse.data
            
            if (paymentData.status === 200 ) {
                console.log(paymentData)
                const generatedUrl = `/payment/${paymentData.session.sessionId}`;
                setURL(generatedUrl);
                console.log(generatedUrl)
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Generated Link",
                    icon: "success"
                });
                setLinkGenerated(true); // Set linkGenerated to true
            } else {
                console.error('Request failed:', paymentResponse.status);
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setIsProcessing(false);
        }

    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.host+URL);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    const handleRedirect = () => {
        window.open(URL, '_blank');
    };


    return (
        <form className="max-w-4xl w-full mx-auto mt-12 p-10 rounded-2xl bg-blue-950 text-white shadow-xl transition-all duration-300" onSubmit={handlePayment}>
            <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide">Select Brand</h2>

            <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Brand</label>
                <select
                    onChange={handleBrandSelect}
                    className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.title}</option>
                    ))}
                </select>
            </div>

            {selectedBrand && (
                <div className="mb-8 bg-white p-5 rounded-lg border border-gray-300 shadow-md">
                    <img src={selectedBrand.url} alt="Brand Logo" className="h-52 w-auto mx-auto rounded-lg bg-black" />
                    <h3 className="text-2xl font-semibold text-center pt-4 text-gray-900">{selectedBrand.title}</h3>
                </div>
            )}

            <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Description</label>
                <textarea
                    placeholder="Enter Your Product Description"
                    value={productDesc}
                    className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows="4"
                    onChange={(e) => setProductDesc(e.target.value)}
                ></textarea>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Amount (USD)</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={brandAmount}
                    onChange={(e) => setBrandAmount(e.target.value)}
                    className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                />
            </div>

            <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide">Client Details</h2>
            <div className="mb-10 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-3">Client Name</label>
                        <input
                            type="text"
                            placeholder="Enter client name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-3">Client Number</label>
                        <input
                            type="number"
                            placeholder="Enter client number"
                            value={clientNum}
                            onChange={(e) => setClientNum(e.target.value)}
                            className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-3">Client Email</label>
                    <input
                        type="email"
                        placeholder="Enter client email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full p-4 border border-gray-400 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className={`w-full py-4 bg-green-600 rounded-lg font-semibold text-white hover:bg-green-700 transition ease-in-out duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} ${linkGenerated ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isProcessing || linkGenerated}
            >
                {isProcessing ? <Loader text={'Processing...'} /> : "Process"}
            </button>

            {linkGenerated && (
                <div className="mt-8 flex flex-col items-center">
                    <p className="text-sm">Payment Link Generated!</p>
                    <div className="flex items-center mt-4 space-x-4">
                        <button onClick={handleCopy} className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200">
                            <FontAwesomeIcon icon={faCopy} /> {isCopied ? "Copied!" : "Copy Link"}
                        </button>
                        <button onClick={handleRedirect} className="p-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200">
                            <FontAwesomeIcon icon={faSquareUpRight} /> Open Link
                        </button>
                    </div>
                </div>
            )}
        </form>

    );
};

export default PreviousPage;
