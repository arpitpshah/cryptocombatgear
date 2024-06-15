import React, {useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {

    const cart = useSelector(state=> state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('Blockchain')
    const dispatch = useDispatch()

    const navigate = useNavigate();

    if(!shippingAddress){
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    const onChangeHandler = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== paymentMethod) {
          setPaymentMethod(selectedValue);
        }
    };
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check type='radio' label='Blockchain' id='Blockchain' name='paymentMethod' value='Blockchain' checked onChange={(e) => onChangeHandler(e)}>
                    </Form.Check>
                    <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => onChangeHandler(e)}>
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
