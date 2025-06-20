// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFactory is Ownable {
    // Track all created NFT contracts by user
    mapping(address => address[]) public userCollections;

    // Event for new collection creation
    event CollectionCreated(address indexed creator, address indexed collection, string name, string symbol);

    constructor() Ownable(msg.sender) {}

    function createCollection(string memory name, string memory symbol) public returns (address) {
        // Deploy new NFT contract
        NFT newCollection = new NFT(name, symbol);

        // Transfer ownership to creator
        newCollection.transferOwnership(msg.sender);

        // Track the collection
        userCollections[msg.sender].push(address(newCollection));

        emit CollectionCreated(msg.sender, address(newCollection), name, symbol);

        return address(newCollection);
    }

    function getUserCollections(address user) public view returns (address[] memory) {
        return userCollections[user];
    }
}
