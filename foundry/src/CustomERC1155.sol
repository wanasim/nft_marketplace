// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155URIStorage} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract CustomERC1155 is ERC1155URIStorage, Ownable {
    // string public name;
    // string public symbol;

    constructor(string memory name_, string memory symbol_) ERC1155("") Ownable(msg.sender) {
        // name = name_;
        // symbol = symbol_;
    }

    function mint(address to, uint256 tokenId, uint256 amount) public onlyOwner {
        _mint(to, tokenId, amount, "");
    }

    function burn(address from, uint256 tokenId, uint256 amount) public onlyOwner {
        _burn(from, tokenId, amount);
    }

    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }
}
