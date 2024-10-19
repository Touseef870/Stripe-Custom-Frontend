import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAg1FK5Kxv3CTb8SM4BadYdSEDE-lNOLJo",
    authDomain: "stripe-logos-data.firebaseapp.com",
    projectId: "stripe-logos-data",
    storageBucket: "stripe-logos-data.appspot.com",
    messagingSenderId: "218328196343",
    appId: "1:218328196343:web:f4655ea251d10ea7e19ff2",
    measurementId: "G-RG405LQ53H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();


const PreviousPage = () => {
    const [brandTitle, setBrandTitle] = useState("");
    const [brandDesc, setBrandDesc] = useState("");
    const [brandAmount, setBrandAmount] = useState("");
    const [brandImg, setBrandImg] = useState(null);
    const [agentName, setAgentName] = useState("");
    const [agentNum, setAgentNum] = useState("");
    const [agentEmail, setAgentEmail] = useState("");
    const [liveImg, setLiveImg] = useState(null);
    const [URL, setURL] = useState('');
    const [isProcessing, setIsProcessing] = useState(false); // Add this line

    const brandData = {
        title: brandTitle,
        description: brandDesc,
        amount: brandAmount * 100,
        image: liveImg,
        agentName,
        agentNum,
        agentEmail,
    };

    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log(brandData);
        setIsProcessing(true); // Set processing state to true

        const storageRef = ref(storage, `StripeLogos/${Math.floor(Math.random() * 13)}`);
        uploadBytes(storageRef, brandImg).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');

            const url = await getDownloadURL(storageRef);
            setLiveImg(url);
            console.log(url);

            const updatedBrandData = {
                title: brandTitle,
                description: brandDesc,
                amount: brandAmount * 100,
                image: url,
                agentName,
                agentNum,
                agentEmail,
            };

            console.log(updatedBrandData);

            try {
                const paymentResponse = await fetch('https://stripecustombackend.netlify.app/create-payment-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedBrandData),
                });

                if (paymentResponse.ok) {
                    const data = await paymentResponse.json();

                    if (data.url) {
                        setURL(data.url);
                    } else {
                        console.log('Payment URL not found in the response');
                    }
                } else {
                    console.error('Request failed with status:', paymentResponse.status);
                    alert('Error creating payment session. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while creating the payment session.');
            } finally {
                setIsProcessing(false); // Reset processing state to false after completion
            }
        }).catch((e) => {
            console.log(e);
            setIsProcessing(false); // Ensure processing state is reset on error
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(URL);
    };

    const handleRedirect = () => {
        window.open(URL, '_blank');
    };

    return (
        <>
            {URL && (
                <div className="flex justify-center items-center my-5 space-x-4">
                    <h3 className="text-xl font-bold text-center">{URL}</h3>
                    <button onClick={handleCopy} className="hover:opacity-75">
                        <img
                            src="https://w7.pngwing.com/pngs/592/864/png-transparent-computer-icons-icon-design-cut-copy-and-paste-taobao-clothing-promotional-copy-text-rectangle-emoticon-thumbnail.png"
                            alt="Copy"
                            className="w-6 h-6"
                        />
                    </button>
                    <button onClick={handleRedirect} className="hover:opacity-75">
                        <img
                            src="https://w7.pngwing.com/pngs/808/964/png-transparent-right-arrow-arrow-rotation-curve-curved-arrow-tool-angle-text-monochrome-thumbnail.png"
                            alt="Go"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            )}

            <form className="max-w-4xl mx-auto mt-10 border p-5 rounded-xl bg-white shadow-lg" onSubmit={handlePayment}>
                <h2 className="text-4xl underline font-bold mb-8 text-center text-gray-800">
                    Enter Brand Details
                </h2>

                {/* Brand Title and Description */}
                <div className="mb-6 flex flex-col lg:flex-row gap-6">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Title</label>
                        <input
                            id="brandTitle"
                            type="text"
                            placeholder="Enter Brand Title"
                            value={brandTitle}
                            onChange={(e) => setBrandTitle(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
                        <input
                            id="brandDesc"
                            type="text"
                            placeholder="Enter Brand Description"
                            value={brandDesc}
                            onChange={(e) => setBrandDesc(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                </div>

                {/* Brand Amount and Image */}
                <div className="mb-6 flex flex-col lg:flex-row gap-6">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Amount</label>
                        <input
                            id="brandAmount"
                            type="number"
                            placeholder="Enter Brand Amount"
                            value={brandAmount}
                            onChange={(e) => setBrandAmount(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Image</label>
                        <input
                            id="brandImg"
                            type="file"
                            onChange={(e) => setBrandImg(e.target.files[0])}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                </div>

                {/* Agent Details */}
                <div className="mb-6 flex flex-col lg:flex-row gap-6">
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
                        <input
                            id="agentName"
                            type="text"
                            placeholder="Enter agent's name"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Agent Number</label>
                        <input
                            id="agentNum"
                            type="number"
                            placeholder="Enter agent's contact number"
                            value={agentNum}
                            onChange={(e) => setAgentNum(e.target.value)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                            required
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Agent Email</label>
                    <input
                        id="agentEmail"
                        type="email"
                        placeholder="Enter agent's email"
                        value={agentEmail}
                        onChange={(e) => setAgentEmail(e.target.value)}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-green-400 to-green-600'} text-white font-semibold shadow-md transition duration-300 ease-in-out`}
                    disabled={isProcessing} // Disable button if processing
                >
                    {isProcessing ? 'Processing...' : 'Process'} {/* Change button text */}
                </button>
            </form>
        </>
    );
};


export default PreviousPage;
