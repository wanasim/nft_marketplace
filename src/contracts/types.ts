import type { Address } from "viem";
import NFTFactory_ABI from "./NFTFactory.json";
import NFT_ABI from "./NFT.json";
import Marketplace_ABI from "./Marketplace.json";

/** Potentially remove reference(s) to NFT address since we are using NFTFactory contract*/
export const CONTRACTS = {
  NFTFactory: {
    address: process.env.NEXT_PUBLIC_NFT_FACTORY_ADDRESS as Address,
    abi: NFTFactory_ABI,
  },
  NFT: {
    address: process.env.NEXT_PUBLIC_ANVIL_NFT_ADDRESS as Address,
    abi: NFT_ABI,
  },
  Marketplace: {
    address: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address,
    abi: Marketplace_ABI,
  },
} as const;
