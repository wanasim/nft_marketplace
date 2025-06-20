// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/CollectionsFactory.sol";
import "../src/Marketplace.sol";

contract DeployScript is Script {
    function run() public {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy CollectionsFactory contract
        CollectionsFactory factory = new CollectionsFactory();
        console.log("CollectionsFactory Contract deployed to:", address(factory));

        // Deploy Marketplace contract
        Marketplace marketplace = new Marketplace();
        console.log("Marketplace Contract deployed to:", address(marketplace));

        // Write addresses to .env.local file
        // string memory envContent = string.concat(
        //     "NEXT_PUBLIC_COLLECTIONS_FACTORY_ADDRESS=",
        //     vm.toString(address(factory)),
        //     "\n",
        //     "NEXT_PUBLIC_MARKETPLACE_ADDRESS=",
        //     vm.toString(address(marketplace))
        // );

        // vm.writeFile(".env.local", envContent);
        // console.log("Addresses written to .env.local");

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
