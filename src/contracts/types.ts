import type { Abi } from "viem";
import NFT_ABI from "./NFT.json";
import Marketplace_ABI from "./Marketplace.json";

export const CONTRACTS = {
  NFT: {
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_ABI as Abi,
  },
  Marketplace: {
    address: process.env
      .NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Marketplace_ABI as Abi,
  },
} as const;
