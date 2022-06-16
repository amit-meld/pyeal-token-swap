# Swap Dapp built with PyTeal and React
The swap Dapp allows users to swap two Algorand Standard Assets (ASA). To swap the sender needs to first optin to the asset. The sender sends a certain value of one of the asset and receive same value of the other asset.

The smart contract was written in PyTeal and the frontend with the Algorand Java Script SDK and React. Transactions are signed on the UI using AlgoSigner.

## PyTeal Smart Contract
PyTeal is a python library for generating TEAL programs that provides a convenient and familiar syntax.
This handles building of the smart contract with PyTeal. The smart contract code can be found in `src/contract/contract.py`

## TEAL
TEAL is Transaction Execution Approval Language. PyTeal code will be compiled to TEAL. The TEAL code consist of the Approval Program and Clear State Program.
The Approval program can be found in `src/contract/approval.teal` and the Clear State Program can be found in `src/contract/clear_state.teal`

## Frontend Interactions with React
To interact with the application the UI code can be found in `src/components`

## AlgoSigner
- The AlgoSigner will be used for signing the transactions on the demo app.

## Deploy Smart Contract with the Algorand JavaScript SDK
The JavaScript SDK will be used for deploying the smart contract code.

# Setup Requirements
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)
- [Vs Code](https://code.visualstudio.com/) or any IDE of your choice
- [Node Package Manager](https://nodejs.org/download/)
- [Create React App](https://github.com/facebook/create-react-app) . This creates a react boilerplate app.
- [Styled Components](https://styled-components.com/)
- [Python 3.6 or higher](https://www.python.org/downloads/)
- [Pyteal Installation](https://pyteal.readthedocs.io/en/stable/installation.html)

## Run the Code
To test the code 
- Fork the repository 
- Do `npm install` this will install all required dependencies. (If you encounter any issue after doing this you can delete the node module folder and do `npm install` again)
- run `npm start` to start the local server at localhost:3000

# Demo


Here is a [demo link]() to the deployed Application on vercel.

# License
Distributed under the MIT License. See for more information. [LICENSE](https://github.com/gconnect/pyeal-token-swap/blob/master/LICENSE)

# Blog and Video Tutorial
For more details you can checkout the blog post [here](https://developer.algorand.org/tutorials/swap-dapp-built-with-pyteal-and-react/) . And here is the link to the [youtube demo]()

# Warning
This project is not audited and should not be used in a production environment.
