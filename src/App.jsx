import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import Success from './component/Success';
import PreviousPage from './component/PreviousPage';
import PaymentPage from './component/PaymentPage';

// Load Stripe
const stripePromise = loadStripe('pk_test_51Q5CQjBSRlxFwzyWZZr67eMkwml3WUCZdRg4bcW5mtBx1NffoI3wDxNJ7QPAzEVUczP8ntAnMPmlDYeTyWEBpjl100xLHDUUps');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        {/* <ProductSelectionForm /> */}
        <Routes>
          <Route path="/" element={<PreviousPage />} />
          <Route path="/payment/:sessionId" element={<PaymentPage />} />
          {/* <Route path="/success" element={<Success/>} /> */}
          {/* Add other routes here */}
        </Routes>
      </Router>
    </Elements>
  );
};

export default App;
