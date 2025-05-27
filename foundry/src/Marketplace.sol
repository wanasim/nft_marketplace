// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    // NFT contract address => token ID => listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    // Platform fee percentage (in basis points, e.g., 250 = 2.5%)
    uint256 public platformFee = 250;

    event NFTListed(address indexed nftContract, uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(
        address indexed nftContract, uint256 indexed tokenId, address indexed seller, address buyer, uint256 price
    );
    event NFTUnlisted(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    constructor() Ownable(msg.sender) {}

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not the owner");
        require(IERC721(nftContract).getApproved(tokenId) == address(this), "Marketplace not approved");

        listings[nftContract][tokenId] = Listing({seller: msg.sender, price: price, active: true});

        emit NFTListed(nftContract, tokenId, msg.sender, price);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        uint256 platformFeeAmount = (listing.price * platformFee) / 10000;
        uint256 sellerAmount = listing.price - platformFeeAmount;

        // Transfer NFT to buyer
        IERC721(nftContract).transferFrom(listing.seller, msg.sender, tokenId);

        // Transfer funds
        (bool platformFeeSuccess,) = owner().call{value: platformFeeAmount}("");
        require(platformFeeSuccess, "Platform fee transfer failed");

        (bool sellerSuccess,) = listing.seller.call{value: sellerAmount}("");
        require(sellerSuccess, "Seller transfer failed");

        // Refund excess payment
        if (msg.value > listing.price) {
            (bool refundSuccess,) = msg.sender.call{value: msg.value - listing.price}("");
            require(refundSuccess, "Refund failed");
        }

        delete listings[nftContract][tokenId];
        emit NFTSold(nftContract, tokenId, listing.seller, msg.sender, listing.price);
    }

    function unlistNFT(address nftContract, uint256 tokenId) external {
        Listing storage listing = listings[nftContract][tokenId];
        require(listing.active, "Listing not active");
        require(listing.seller == msg.sender, "Not the seller");

        delete listings[nftContract][tokenId];
        emit NFTUnlisted(nftContract, tokenId, msg.sender);
    }

    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
}
