const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {

    it("Should deploy with correct initial supply", async function () {
        const [owner] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(
            ethers.utils.parseEther("1000")
        );

        expect(await token.balanceOf(owner.address)).to.equal(
            ethers.utils.parseEther("1000")
        );
    });

    it("Should allow owner to mint", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(
            ethers.utils.parseEther("1000")
        );

        await token.mint(addr1.address, 100);

        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("Should transfer tokens", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(
            ethers.utils.parseEther("1000")
        );

        await token.transfer(addr1.address, 100);

        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("Should fail if sending more than balance", async function () {
        const [owner, addr1] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        const token = await MyToken.deploy(
            ethers.utils.parseEther("1000")
        );

        await expect(
            token.transfer(
                addr1.address,
                ethers.utils.parseEther("2000") // 👈 FIXED
            )
        ).to.be.reverted;
    });
});