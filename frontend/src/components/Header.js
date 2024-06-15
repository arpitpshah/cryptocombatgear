import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import axios from 'axios';

const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [balance, setBalance] = useState(null);

  const logoutHandler = () => {
    dispatch(logout())
  }

  const fetchBalance = async () => {
    const address = userInfo.account; // Replace with the correct property if needed
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/blockchain/balance/${address}`);
      setBalance(parseFloat(data.balance).toFixed(4)); // Adjust according to your API response
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const truncateWalletAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <header>
       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>CryptoCombatGear</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={
                  <>
                    <i className='fas fa-wallet wallet-icon'></i>
                    {truncateWalletAddress(userInfo.account)}
                  </>
                } id='wallet-menu'>
                  <NavDropdown.Item href={`https://etherscan.io/address/${userInfo.account}`} target="_blank">
                    View on Etherscan
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  {balance !== null && `Balance: ${balance} ETH`}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Disconnect Wallet
                  </NavDropdown.Item>
                </NavDropdown>
              ):(
              <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-wallet'></i>Connect Wallet</Nav.Link>
              </LinkContainer>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
