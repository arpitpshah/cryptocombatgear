import Web3 from 'web3';
import dotenv from 'dotenv';
import asyncHandler from "express-async-handler";
import products from '../data/products.js';
import { productJS }from '../contracts/products.js'

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const productManagerABI = productJS
const productManagerAddress = process.env.CONTRACT_ADDRESS;
const productManagerContract = new web3.eth.Contract(productManagerABI, productManagerAddress);
export const getProducts = asyncHandler(async (req, res) => {
    const count = await productManagerContract.methods.getProductsCount().call();

    let blockchainProducts = [];
    for (let i = 0; i < count; i++) {
        let product = await productManagerContract.methods.getProduct(i).call();
        blockchainProducts.push({
            id: product.id.toString(), // Convert BigInt to string
            name: product.name,
            image: product.image,
            description: product.description
        });
    }
    const mergedProducts = blockchainProducts.map(bp => {
        const additionalData = products.find(p => p._id === bp.id);
        return additionalData ? {...bp, ...additionalData} : bp;
    });

    res.json(mergedProducts);
});



export const getProductById = asyncHandler(async (req, res) => {
    const productId = (parseInt(req.params.id)-1);
    let product = await productManagerContract.methods.getProduct(productId).call();
    const blockchainProduct = {
        id: product.id.toString(),
        name: product.name,
        image: product.image,
        description: product.description
    };

    const additionalData = products.find(p => p._id === blockchainProduct.id);
    if (additionalData) {
        const mergedProduct = {...blockchainProduct, ...additionalData};
        res.json(mergedProduct);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});