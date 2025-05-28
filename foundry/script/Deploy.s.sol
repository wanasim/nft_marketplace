// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/NFT.sol";
import "../src/Marketplace.sol";

contract DeployScript is Script {
    function run() public {
        // Get the private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy NFT contract
        NFT nft = new NFT();
        console.log("NFT Contract deployed to:", address(nft));

        // Deploy Marketplace contract
        Marketplace marketplace = new Marketplace();
        console.log("Marketplace Contract deployed to:", address(marketplace));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
