// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CustomERC1155} from "./CustomERC1155.sol";

contract CollectionsFactory is Ownable {
    mapping(address => address[]) public userCollections;

    event CollectionCreated(address indexed creator, address indexed collection, string name, string symbol);
    event TokenAdded(address indexed user, address indexed collection, uint256 tokenId, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createCollection(string memory name, string memory symbol) public returns (address) {
        CustomERC1155 newCollection = new CustomERC1155(name, symbol);
        userCollections[msg.sender].push(address(newCollection));

        emit CollectionCreated(msg.sender, address(newCollection), name, symbol);

        return address(newCollection);
    }

    function getUserCollections(address user) public view returns (address[] memory) {
        return userCollections[user];
    }

    function addToCollection(address collectionAddress, uint256 tokenId, uint256 amount) public returns (address) {
        CustomERC1155 userCollection = CustomERC1155(collectionAddress);
        require(userCollection.owner() == msg.sender, "must be an owner of collection");
        userCollection.mint(msg.sender, tokenId, amount);

        emit TokenAdded(msg.sender, collectionAddress, tokenId, amount);
        return collectionAddress;
    }
}
