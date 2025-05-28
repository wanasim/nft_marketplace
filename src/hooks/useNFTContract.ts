import {
  useContractRead,
  useWriteContract,
  useWaitForTransactionReceipt,
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
  const { data: mintData, writeContract: mint } = useWriteContract();

  const { isLoading: isMinting, isSuccess: isMintSuccess } =
    useWaitForTransactionReceipt({
      hash: mintData,
    });

  // Helper functions
  const mintNFT = async (recipient: `0x${string}`, tokenURI: string) => {
    try {
      await mint({
        address: NFT_CONTRACT_ADDRESS,
        abi: NFT_ABI,
        functionName: "mint",
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
