import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { parseEther } from "viem";
import NFT_ABI from "@/contracts/NFT.json";

const NFT_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

export function useNFTContract() {
  // Read functions
  const { data: name } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: "symbol",
  });

  // Write functions
  const { data: mintData, write: mint } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: "mint",
  });

  const { isLoading: isMinting, isSuccess: isMintSuccess } =
    useWaitForTransaction({
      hash: mintData?.hash,
    });

  // Helper functions
  const mintNFT = async (recipient: `0x${string}`, tokenURI: string) => {
    try {
      await mint({
        args: [recipient, tokenURI],
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    }
  };

  return {
    name,
    symbol,
    mintNFT,
    isMinting,
    isMintSuccess,
  };
}
