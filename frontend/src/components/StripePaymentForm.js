import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';

const StripePaymentForm = ({ processing, handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cardStyle = {
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
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    // Call the handlePayment function with stripe and elements
    handlePayment(stripe, elements);
  };

  // Inline CSS
  const formStyle = {
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: '#ffffff',
  };

  const stripeInputStyle = {
    marginBottom: '20px',
  };

  const stripeElementStyle = {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
  };

  const buttonStyle = {
    fontSize: '18px',
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  };

  return (
    <form onSubmit={submitHandler} style={formStyle}>
      <div style={stripeInputStyle}>
        <CardElement options={cardStyle} style={stripeElementStyle} />
      </div>
      <Button
        type='submit'
        className='btn-block'
        style={stripe ? buttonStyle : buttonDisabledStyle}
        disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
};

export default StripePaymentForm;
