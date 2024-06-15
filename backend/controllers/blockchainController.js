import Web3 from 'web3';

const infuraUrl = 'https://sepolia.infura.io/v3/e15fc319319240db9a757b230c1bc737';
const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
export const getBalance = async (req, res) => {
  try {
    let balance = await web3.eth.getBalance(req.params.address);
    balance = web3.utils.fromWei(balance, 'ether')
    res.json({ balance });
  } catch (error) {
    console.error('Error:', error);
  }
};

