import type { Address } from "viem";
import CollectionsFactory_ABI from "./CollectionsFactory.json";
import CustomERC1155_ABI from "./CustomERC1155.json";
import Marketplace_ABI from "./Marketplace.json";

/** TODO: Potentially remove reference(s) to NFT address since we are using NFTFactory contract*/
export const CONTRACTS = {
  CollectionsFactory: {
    address: process.env
      .NEXT_PUBLIC_COLLECTIONS_FACTORY_ADDRESS as Address,
    abi: CollectionsFactory_ABI,
  },
  Marketplace: {
    address: process.env
      .NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address,
    abi: Marketplace_ABI,
  },
  // ABI for dynamically created collections
  CustomERC1155: {
    abi: CustomERC1155_ABI,
  },
} as const;
