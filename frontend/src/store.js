import { configureStore } from '@reduxjs/toolkit'
import { combineReducers  } from 'redux'
import thunk from 'redux-thunk'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { myOrderListReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'

const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const intialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store=configureStore({
    reducer:reducers, 
    preloadedState:intialState,
    middleware:middleware
})


export default store