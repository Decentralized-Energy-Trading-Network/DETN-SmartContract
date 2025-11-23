// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SLRToken is ERC20 {
    constructor() ERC20("SLR Token", "SLR") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Custom transfer function with additional checks (optional)
    function safeTransfer(address recipient, uint256 amount) external returns (bool) {
        require(recipient != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    
}