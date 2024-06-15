# CryptoCombatGear

CryptoCombatGear is a decentralized application (DApp) built for managing and trading virtual combat gear using blockchain technology. The project comprises a frontend, a backend, and smart contracts deployed on the Ethereum blockchain.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Setup and Configuration](#setup-and-configuration)
- [Operations](#Operations)
- [Contributing](#contributing)
- [License](#license)

## Introduction

CryptoCombatGear is designed to enhance the MMA retail experience by leveraging blockchain technology. This platform allows users to connect their MetaMask accounts for authentication and use Ethereum wallets for transactions, ensuring proper security and transparency.

## Features

- **Blockchain Integration**: Ensures secure and transparent transactions.
- **MetaMask Authentication**: Uses MetaMask for user authentication without traditional login methods.
- **Hybrid Product Management**: Combines data from smart contracts and local storage for efficient product management.
- **Multiple Payment Options**: Supports payments via blockchain and Stripe.


## Technologies

The project is built with the following technologies:

- **Ethereum**: A decentralized blockchain platform.
- **MetaMask**: A browser extension for Ethereum and DApp interaction.
- **Solidity**: A programming language for writing smart contracts.
- **Remix**: An IDE for developing and deploying smart contracts.
- **Sepolia**: A test network for Ethereum.
- **Web3.js**: A collection of libraries for interacting with the Ethereum blockchain.
- **Infura**: An Infrastructure as a Service (IaaS) provider for Ethereum.
- **Stripe**: A payment processing platform.
- **Node.js**: A JavaScript runtime for building the backend.
- **Express.js**: A web application framework for Node.js.
- **React.js**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool for JavaScript apps.
- **Bootstrap**: A CSS framework for developing responsive web apps.
- **Elastic Beanstalk**: An AWS service for deploying and managing applications.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- npm or yarn
- MetaMask (browser extension)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

2. Install the dependencies:
    ```bash
    npm install

3. Set up the environment variables in the .env file.

4. Start the backend server:
    ```bash
    npm start

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend

2. Install the dependencies:
    ```bash
    npm install

3. Start the frontend application:
    ```bash
    npm start

## Usage
Once the servers are running, you can access the application via http://localhost:3000 for the frontend. Users can connect their MetaMask accounts to interact with the platform and make purchases using blockchain technology or Stripe.

## Environment Variables
Ensure you have the necessary environment variables set up. You can find a sample configuration in the .env file. Here are the key variables:

`MONGODB_URI`: MongoDB connection string (if used)
`PORT`: Port for the backend server
`REACT_APP_API_URL`: URL for the backend API
`INFURA_PROJECT_ID`: Infura project ID for Ethereum network connectivity
`STRIPE_PUBLIC_KEY`: Stripe public key for payment processing
`STRIPE_SECRET_KEY`: Stripe secret key for payment processing

## setup-and-configuration

### Node.js and React.js
1. Initialize the Node.js project:
    ```bash
    npm init

2. Install necessary packages:
    ```bash
    npm install

3. Create a React.js project:
    ```bash
    npx create-react-app appname

### MetaMask Integration
1. Download and set up the MetaMask extension.
2. Connect the MetaMask wallet to your application.

### Smart Contracts
1. Write and deploy contracts using Remix and Solidity.
2. Compile and deploy contracts on Remix IDE with MetaMask integration.

### Web3.js and Infura
1. Install Web3.js:
    ```bash
    npm install web3

2. Set up Infura for Ethereum network access.

### Stripe
1. Create a Stripe account in test mode.
2. Use provided test keys for integration.

## Operations
1. User Authentication: Users connect their MetaMask wallets to authenticate.
2. Product Management: Products are added and retrieved using a hybrid approach combining smart contracts and local data.
3. Payment Processing: Payments can be made using either Ethereum through MetaMask or Stripe.
4. Blockchain Interaction: Use Web3.js and Infura for seamless interaction with the Ethereum blockchain.

## Contributing
We welcome contributions from the community. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

## License
This project is licensed under the MIT License.

