const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with account:", deployer.address);

    const MyToken = await ethers.getContractFactory("MyToken");

    const token = await MyToken.deploy(
        ethers.utils.parseEther("1000000")
    );

    await token.deployed();

    console.log("MyToken deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});