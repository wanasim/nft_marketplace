// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NFT.sol";
import "../src/Marketplace.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy NFT contract
        NFT nft = new NFT();

        // Deploy Marketplace contract
        Marketplace marketplace = new Marketplace();

        vm.stopBroadcast();
    }
}
