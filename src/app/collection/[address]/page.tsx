"use client";

import { useParams } from "next/navigation";
import { useReadContracts } from "wagmi";
import { CONTRACTS } from "@/contracts/types";
import { Header } from "@/components/header";
import { NFTCard } from "@/components/nft-card";
import { NFTGridSkeleton } from "@/components/nft-grid-skeleton";
import type { NFT } from "@/types/nft";
import type { Abi } from "viem";

export default function CollectionPage() {
  const { address } = useParams();
  const collectionAddress = address as `0x${string}`;

  // Fetch collection details
  const { data: collectionData } = useReadContracts({
    contracts: [
      {
        address: collectionAddress,
        abi: CONTRACTS.CustomERC1155.abi as Abi,
        functionName: "name",
      },
      {
        address: collectionAddress,
        abi: CONTRACTS.CustomERC1155.abi as Abi,
        functionName: "symbol",
      },
    ],
  });

  // Fetch NFTs in collection
  const { data: nfts, isLoading } = useReadContracts({
    contracts: Array.from({ length: 10 }, (_, i) => ({
      address: collectionAddress,
      abi: CONTRACTS.CustomERC1155.abi as Abi,
      functionName: "uri",
      args: [i],
    })),
  });

  const nftData =
    nfts?.map((nft, index) => ({
      id: index.toString(),
      tokenId: index.toString(),
      name: `NFT #${index}`,
      description: "NFT from collection",
      image: (nft.result as string) || "https://via.placeholder.com/400x400",
      owner: collectionAddress,
      creator: collectionAddress,
      contractAddress: collectionAddress,
      isListed: false,
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {(collectionData?.[0]?.result as string) || "Loading..."}
          </h1>
          <p className="text-gray-600">
            Collection:{" "}
            {(collectionData?.[1]?.result as string) || "Loading..."}
          </p>
        </div>

        {isLoading ? (
          <NFTGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nftData.map((nft) => (
              <NFTCard
                key={nft.id}
                nft={nft}
                onBuy={() => {}}
                onList={() => {}}
                onUnlist={() => {}}
                isLoading={false}
              />
            ))}
          </div>
        )}

        {nftData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No NFTs found in this collection.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
