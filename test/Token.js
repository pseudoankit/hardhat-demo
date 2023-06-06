const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token Contract", function () {

    it("Once deployed owner should have token equal to total supply", async function() {
        
        const [owner] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        const ownerBalance = await hhToken.balanceOf(owner.address);

        expect(await hhToken.totalSupply()).to.equal(ownerBalance);
    });
});