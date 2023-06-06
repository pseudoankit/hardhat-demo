// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Token {
    string public name = "Token";
    string public symbol = "MT";
    uint public totalSupply = 1000;

    address owner;
    mapping(address => uint) balances;

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function transfer(address _to, uint _amount) external {
        uint currentAmount = balances[_to];
        require(currentAmount >= _amount, "low balance cannot transfer funds");

        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address acc) external view returns (uint) {
        return balances[acc];
    }
}
