const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token Contract", function () {

    it("Once deployed owner should have token equal to total supply", async function() {
        
        const [owner] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        expect(await hhToken.totalSupply()).to.equal(await hhToken.balanceOf(owner.address));
    });

    it("should not be able to transfer funds if sender has less balance than amount sending", () => {

    });

    it("once funds are transferred sender account should be deducted with the amount sent", async () => {
        const value = 10;
        const [owner, _to] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        await hhToken.transfer(_to.address, value);

        expect(value).to.equal(await hhToken.balanceOf(_to.address));
    });

    it("once funds are transferred reciever account should be added with the amount sent", () => {

    });
});