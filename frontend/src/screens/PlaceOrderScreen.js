import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { payOrderBlockchain } from '../actions/orderActions'
import axios from "axios"
import Loader from '../components/Loader'
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { removeFromCart } from '../actions/cartActions';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';

const PlaceOrderScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false);
  const orderPay = useSelector(state => state.orderPay);
  const { loading, success, error } = orderPay;
  const [sdkReady, setSdkReady] = useState(false);
  const cart = useSelector(state => state.cart)

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',currency: 'USD',minimumFractionDigits: 2

   })

  //calculate prices
   const cartItems = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty,0)
   const shippingPrice = cart.itemsPrice > 100 ? 0 : 100
   const taxPrice = cartItems * 0.15
   const totalPrice = cartItems + shippingPrice + taxPrice

  cart.itemsPrice = formatter.format(cartItems)
  cart.shippingPrice = formatter.format(shippingPrice)
  cart.taxPrice = formatter.format(taxPrice)
  cart.totalPrice = formatter.format(totalPrice)
  
  useEffect(() => {
    const addStripeSdk = async () => {
      if (cart.paymentMethod === 'Stripe' && !window.document.querySelector('#stripe-js')) {
        const stripeJs = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        setSdkReady(!!stripeJs);
      } else {
        setSdkReady(true);
      }
    };
    addStripeSdk();
  }, [cart.paymentMethod]);

  useEffect(() => {
    if (success) {
      cart.cartItems.forEach(item => {
        dispatch(removeFromCart(item.product));
      });
      dispatch({ type: ORDER_PAY_RESET });
      setProcessing(false);
      alert('Payment successful!');
      navigate('/');
    } else if (error) {
      setProcessing(false); 
      alert(error); 
    }

  }, [success, error, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch({ type: ORDER_PAY_RESET });
    };
  }, [dispatch]);

  const placeOrderHandler = () => {
    setProcessing(true);
    if (cart.paymentMethod === 'Stripe') {
      stripePaymentHandler();
    } else {
      blockchainPaymentHandler();
    }
   
  };
  const stripePaymentHandler = async (stripe,elements) => {
    setProcessing(true);
  
    const cardElement = elements.getElement(CardElement);
    try {    
      const { data } = await axios.post(`${apiUrl}/api/orders/create-payment-intent`, {
        amount: Math.floor(totalPrice),
      });
      
      const clientSecret = data.clientSecret;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Arpit Shah',
          },
        },
      });
  
      if (paymentResult.error) {
        alert(paymentResult.error.message);
        setProcessing(false);
      } else {
        // The payment has been processed!
        if (paymentResult.paymentIntent.status === 'succeeded') {
          alert('Payment successful!');
          cart.cartItems.forEach(item => {
            dispatch(removeFromCart(item.product)); 
          });
          navigate('/');
        } else {
          alert('Payment processing failed, please try again.');
          setProcessing(false);
        }
      }
    } catch (error) {
      alert(error.message);
      setProcessing(false);
    }
  };
  const blockchainPaymentHandler = () => {
    setProcessing(true);
    const orderId = cart.cartItems[0].name; 
    const amount = (Math.floor(totalPrice)/10000); 

    dispatch(payOrderBlockchain(orderId, amount));
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {' '} {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>:
                    (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Order Summary
                        </h2>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>{cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>{cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>{cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>{cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    {cart.paymentMethod === 'Stripe' && sdkReady ? (
                        <Elements stripe={stripePromise}>
                            <StripePaymentForm
                                processing={processing}
                                handlePayment={stripePaymentHandler} />
                        </Elements>
                    ) : (
                        <Button
                        type='button'
                        className='btn-block'
                        disabled={processing}
                        onClick={placeOrderHandler}>
                        Place Order
                        </Button>
                    )}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
