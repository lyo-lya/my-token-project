require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
    solidity: "0.8.20",
    networks: {
        op_sepolia: {
            url: process.env.OP_SEPOLIA_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};