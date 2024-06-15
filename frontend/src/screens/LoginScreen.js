import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { connectMetaMask } from '../actions/userActions'


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const { search } = useLocation()
  const redirect =  new URLSearchParams(search).get("redirect")
  ? new URLSearchParams(search).get("redirect")
  : "/";

  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[navigate, userInfo, redirect])

  const connectWalletHandler = (e) =>{
    e.preventDefault();
    dispatch(connectMetaMask())
  }

  return (
    <FormContainer>
            <h1>Sign In with MetaMask</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}

            <Button onClick={connectWalletHandler} variant='primary'>
                Connect with MetaMask
            </Button>

            <Row className='py-3'>
                <Col>
                    New to Ethereum? 
                    <a href='https://metamask.io/download.html' target='_blank' rel='noopener noreferrer'>
                        Learn more about MetaMask
                    </a>
                </Col>
            </Row>
        </FormContainer>
  )
}

export default LoginScreen
