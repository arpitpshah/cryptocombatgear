import Web3 from 'web3';
import OrderPaymentABIJS from '../contracts/orderpayment.json'
import { ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Replace with your contract address
    const OrderPaymentABI = OrderPaymentABIJS

    export const payOrderBlockchain = (orderId, amount) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(OrderPaymentABI, contractAddress);

        const paymentAmount = web3.utils.toWei(amount.toString(), 'ether');

        await contract.methods.payForOrder(orderId).send({
            from: accounts[0],
            value: paymentAmount
        });

        dispatch({ type: ORDER_PAY_SUCCESS });

    } catch (error) {
        dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.message || 'Payment transaction failed'
        });
    }
};

