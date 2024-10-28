import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Success from './component/Success';
import PreviousPage from './component/PreviousPage';
import PaymentPage from './component/PaymentPage';
import EmailTemp from './component/EmailTemp';

// Load Stripe
const stripePromise = loadStripe('pk_live_51PsYF5Rs59uQ3D7xM0547PGcNYornB4y44BQXMqErO3ZhIsJ4kn2pD29vEcpA1woj6E5OTtgdaUadA3OiMv68TdE00SLVGmQH7');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        {/* <ProductSelectionForm /> */}
        <Routes>
          <Route path="/" element={<PreviousPage />} />
          <Route path="/payment/:sessionId" element={<PaymentPage />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/email" element={<EmailTemp />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </Elements>
  );
};

export default App;
