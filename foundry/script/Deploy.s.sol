// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/NFTFactory.sol";
import "../src/Marketplace.sol";

contract DeployScript is Script {
    function run() public {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy NFTFactory contract
        NFTFactory factory = new NFTFactory();
        console.log("NFTFactory Contract deployed to:", address(factory));

        // Deploy Marketplace contract
        Marketplace marketplace = new Marketplace();
        console.log("Marketplace Contract deployed to:", address(marketplace));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
