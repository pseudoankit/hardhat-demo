const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token Contract", function () {

    it("Once deployed owner should have token equal to total supply", async function() {
        
        const [owner] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        expect(await hhToken.totalSupply()).to.equal(await hhToken.balanceOf(owner.address));
    });

    it("should not be able to transfer funds if sender has less balance than amount sending", async () => {
        const [owner, addr1] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        const transfer = await hhToken.totalSupply() + 100;

        await expect(hhToken.transfer(addr1.address, transfer)).to.be.revertedWith("low balance cannot transfer funds");

    });

    it("should transfer funds between multiple accounts", async () => {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const token = await ethers.getContractFactory("Token");
        const hhToken = await token.deploy();

        // transfer owner to address
        const transfer1 = 100;
        await hhToken.transfer(addr1.address, transfer1);

        expect(transfer1).to.equal(await hhToken.balanceOf(addr1.address));
        expect(await hhToken.totalSupply() - transfer1).to.equal(await hhToken.balanceOf(owner.address));

        // transfer between two addr1 -> addr2
        const balanceOfAddr1BeforeTransfer = await hhToken.balanceOf(addr1.address)
        const transfer2 = 20;
        await hhToken.connect(addr1).transfer(addr2.address, transfer2);

        expect(transfer2).to.equal(await hhToken.balanceOf(addr2.address));
        expect(balanceOfAddr1BeforeTransfer - transfer2).to.equal(await hhToken.balanceOf(addr1.address));
    });

});
