"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { CONTRACTS } from "@/contracts/types";
import { MintNFTForm } from "@/components/mint-nft-form";
import { toast } from "sonner";
import { pinFileToIPFS } from "@/lib/pinata";
import { parseEther } from "viem";

export default function CreatePage() {
  const { address } = useAccount();
  const [isUploading, setIsUploading] = useState(false);

  const { data: mintData, writeContract: mintNFT } = useWriteContract();

  const { data: listData, writeContract: listNFT } = useWriteContract();

  const { isLoading: isMintLoading, isSuccess: isMintSuccess } =
    useWaitForTransactionReceipt({
      hash: mintData,
    });

  const { isLoading: isListLoading, isSuccess: isListSuccess } =
    useWaitForTransactionReceipt({
      hash: listData,
    });

  useEffect(() => {
    if (isMintSuccess) {
      toast.success("NFT minted successfully");
    } else if (isListSuccess) {
      toast.success("NFT listed successfully");
    }
  }, [isMintSuccess, isListSuccess]);

  const handleMint = async (formData: {
    name: string;
    description: string;
    price: string;
    image: File;
  }) => {
    try {
      setIsUploading(true);

      // 3. Upload image to Pinata
      const fileHash = await pinFileToIPFS(formData.image, formData.name);
      console.log("fileHash", fileHash);
      setIsUploading(false);

      console.log("NFT address", CONTRACTS.NFT.address);
      // 4. Mint NFT
      mintNFT({
        address: CONTRACTS.NFT.address,
        abi: CONTRACTS.NFT.abi,
        functionName: "mint",
        args: [address, fileHash],
      });

      listNFT({
        ...CONTRACTS.Marketplace,
        functionName: "listNFT",
        args: [CONTRACTS.NFT.address, 0, parseEther(formData.price)],
      });
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    } finally {
      setIsUploading(false);
      toast.success("NFT minted successfully");
    }
  };

  if (!address) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Please connect your wallet to mint NFTs</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Create New NFT</h1>
      <MintNFTForm
        onSubmit={handleMint}
        isLoading={isMintLoading || isListLoading || isUploading}
      />
    </div>
  );
}
