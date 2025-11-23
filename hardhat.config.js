require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL;
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL;

module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137,
      gasPrice: 50000000000, 
    },
    mumbai: {
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 137,
      gasPrice: 50000000000, 
    },
  },
};