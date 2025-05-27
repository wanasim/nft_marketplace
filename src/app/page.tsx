"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { Header } from "@/components/header";
import { NFTCard } from "@/components/nft-card";
import { NFTGridSkeleton } from "@/components/nft-grid-skeleton";
import type { NFT } from "@/types/nft";

// Mock data for development - replace with actual contract calls
const mockNFTs: NFT[] = [
  {
    id: "1",
    tokenId: "1",
    name: "Cool Cat #1",
    description: "A very cool cat NFT with unique traits and characteristics.",
    image: "https://via.placeholder.com/400x400/6366f1/ffffff?text=NFT+1",
    owner: "0x1234567890123456789012345678901234567890",
    creator: "0x1234567890123456789012345678901234567890",
    contractAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    price: "1000000000000000000", // 1 ETH in wei
    isListed: true,
    listingId: "1",
  },
  {
    id: "2",
    tokenId: "2",
    name: "Digital Art #2",
    description: "Beautiful digital artwork created by a talented artist.",
    image: "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=NFT+2",
    owner: "0x2345678901234567890123456789012345678901",
    creator: "0x2345678901234567890123456789012345678901",
    contractAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    price: "500000000000000000", // 0.5 ETH in wei
    isListed: true,
    listingId: "2",
  },
  {
    id: "3",
    tokenId: "3",
    name: "Pixel Art #3",
    description: "Retro pixel art with nostalgic vibes.",
    image: "https://via.placeholder.com/400x400/10b981/ffffff?text=NFT+3",
    owner: "0x3456789012345678901234567890123456789012",
    creator: "0x3456789012345678901234567890123456789012",
    contractAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    isListed: false,
  },
];

export default function HomePage() {
  const { address } = useAccount();
  const [loadingNFT, setLoadingNFT] = useState<string | null>(null);

  // Mock query - replace with actual contract calls
  const {
    data: nfts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nfts"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockNFTs;
    },
  });

  const handleBuyNFT = async (nft: NFT) => {
    if (!address) return;

    setLoadingNFT(nft.id);
    try {
      // TODO: Implement actual buy functionality
      console.log("Buying NFT:", nft);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
      alert(`Successfully bought ${nft.name}!`);
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Failed to buy NFT");
    } finally {
      setLoadingNFT(null);
    }
  };

  const handleListNFT = async (nft: NFT) => {
    if (!address) return;

    const price = prompt("Enter price in ETH:");
    if (!price) return;

    setLoadingNFT(nft.id);
    try {
      // TODO: Implement actual list functionality
      console.log("Listing NFT:", nft, "for", price, "ETH");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
      alert(`Successfully listed ${nft.name} for ${price} ETH!`);
    } catch (error) {
      console.error("Error listing NFT:", error);
      alert("Failed to list NFT");
    } finally {
      setLoadingNFT(null);
    }
  };

  const handleUnlistNFT = async (nft: NFT) => {
    if (!address) return;

    setLoadingNFT(nft.id);
    try {
      // TODO: Implement actual unlist functionality
      console.log("Unlisting NFT:", nft);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
      alert(`Successfully unlisted ${nft.name}!`);
    } catch (error) {
      console.error("Error unlisting NFT:", error);
      alert("Failed to unlist NFT");
    } finally {
      setLoadingNFT(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover NFTs</h1>
          <p className="text-gray-600">
            Explore, collect, and sell extraordinary NFTs on the world's first
            and largest NFT marketplace.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">
              Failed to load NFTs. Please try again later.
            </p>
          </div>
        )}

        {isLoading ? (
          <NFTGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts?.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onBuy={handleBuyNFT}
                onList={handleListNFT}
                onUnlist={handleUnlistNFT}
                isLoading={loadingNFT === nft.id}
              />
            ))}
          </div>
        )}

        {nfts && nfts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No NFTs found.</p>
          </div>
        )}
      </main>
    </div>
  );
}
