import Web3 from 'web3';
import dotenv from 'dotenv';
import productsData from '../data/products.js';

dotenv.config();
const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/e15fc319319240db9a757b230c1bc737'));
const abi = productJS
const contractAddress = process.env.CONTRACT_ADDRESS;

const privateKey = process.env.PRVIAT_KEY
web3.eth.accounts.wallet.add(privateKey);
const account = web3.eth.accounts.wallet[0];
const accountAddress = account.address;
let nonce = await web3.eth.getTransactionCount(accountAddress, 'latest'); 
const productManager = new web3.eth.Contract(abi, contractAddress);

const addProduct = async (product) => {
    await productManager.methods.addProduct(product._id,product.name, product.image, product.description)
    .send({ 
        from: accountAddress, 
        gas: 1000000, 
        gasPrice: web3.utils.toWei('20', 'gwei'), 
        nonce: nonce 
    });
};

let currentNonce = nonce;
for (const product of productsData) {
    await addProduct(product, currentNonce++);
    nonce++;
}
