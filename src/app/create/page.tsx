"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContracts,
} from "wagmi";
import { CONTRACTS } from "@/contracts/types";
import { toast } from "sonner";
import { pinFileToIPFS } from "@/lib/pinata";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
  const { address } = useAccount();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<`0x${string}` | "">("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null as File | null,
    supply: "1",
  });
  const [preview, setPreview] = useState<string>("");

  const { data: collections } = useReadContracts({
    contracts: address
      ? [
          {
            ...CONTRACTS.CollectionsFactory,
            functionName: "getUserCollections",
            args: [address],
          },
        ]
      : [],
  });
  const collectionAddresses =
    (collections?.[0]?.result as `0x${string}`[]) || [];

  const { data: mintData, writeContract: mintNFT } =
    useWriteContract();
  const { data: listData, writeContract: listNFT } =
    useWriteContract();

  const {
    isLoading: isMintLoading,
    isSuccess: isMintSuccess,
  } = useWaitForTransactionReceipt({ hash: mintData });
  const {
    isLoading: isListLoading,
    isSuccess: isListSuccess,
  } = useWaitForTransactionReceipt({ hash: listData });

  useEffect(() => {
    if (isMintSuccess) {
      toast.success("NFT minted successfully");
    } else if (isListSuccess) {
      toast.success("NFT listed successfully");
    }
  }, [isMintSuccess, isListSuccess]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollection) return;
    if (!formData.image) {
      toast.error("Please select an image");
      return;
    }
    try {
      setIsUploading(true);
      // Upload image to Pinata
      const fileHash = await pinFileToIPFS(
        formData.image,
        formData.name
      );
      setIsUploading(false);
      // Mint NFT in the selected collection
      mintNFT({
        address: selectedCollection as `0x${string}`,
        abi: CONTRACTS.CustomERC1155.abi,
        functionName: "mint",
        args: [address, 0, Number(formData.supply)], // tokenId 0, amount = supply
      });
      // List NFT on marketplace
      listNFT({
        ...CONTRACTS.Marketplace,
        functionName: "listNFT",
        args: [
          selectedCollection,
          0,
          parseEther(formData.price),
        ],
      });
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!address) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">
          Please connect your wallet to mint NFTs
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold">
        Create an NFT
      </h1>
      <p className="mb-8 text-gray-400">
        Once your item is minted you will not be able to
        change any of its information.
      </p>
      <form
        onSubmit={handleMint}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Media Upload */}
        <div className="flex-1 bg-zinc-900 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-64 w-64 object-cover rounded-lg"
            />
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl mb-4">⬆️</div>
                <div className="mb-2 font-medium">
                  Drag and drop media
                </div>
                <label className="text-blue-400 cursor-pointer underline">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  Browse files
                </label>
                <div className="text-xs text-gray-500 mt-2">
                  Max size: 50MB
                  <br />
                  JPG, PNG, GIF, SVG, MP4
                </div>
              </div>
            </>
          )}
        </div>
        {/* NFT Details */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Collection Dropdown or Create Prompt */}
          <div>
            <Label className="mb-1 block">
              Collection *
            </Label>
            {collectionAddresses.length > 0 ? (
              <select
                className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={selectedCollection}
                onChange={(e) =>
                  setSelectedCollection(
                    e.target.value as `0x${string}`
                  )
                }
                required
              >
                <option value="">
                  Choose a collection
                </option>
                {collectionAddresses.map((address) => (
                  <option key={address} value={address}>
                    {address.slice(0, 6)}...
                    {address.slice(-4)}
                  </option>
                ))}
              </select>
            ) : (
              <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center justify-center text-center">
                <div className="mb-2 text-lg font-semibold">
                  No collections found
                </div>
                <div className="mb-4 text-gray-400">
                  You need a collection before you can mint
                  an NFT.
                </div>
                <Button
                  onClick={() =>
                    router.push("/create-collection")
                  }
                >
                  Create Collection
                </Button>
              </div>
            )}
          </div>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Name your NFT"
              required
            />
          </div>
          {/* Supply */}
          <div>
            <Label htmlFor="supply">Supply *</Label>
            <Input
              id="supply"
              type="number"
              min="1"
              value={formData.supply}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  supply: e.target.value,
                }))
              }
              required
            />
          </div>
          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter a description"
            />
          </div>
          {/* Price */}
          <div>
            <Label htmlFor="price">Price (ETH)</Label>
            <Input
              id="price"
              type="number"
              step="0.001"
              min="0"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              required
            />
          </div>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={
              !selectedCollection ||
              !formData.name ||
              !formData.supply ||
              !formData.price ||
              isMintLoading ||
              isListLoading ||
              isUploading ||
              !formData.image
            }
          >
            {isMintLoading || isListLoading || isUploading
              ? "Creating..."
              : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
