"use client";

import Image from "next/image";
import { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { NFT } from "@/types/nft";

interface NFTCardProps {
  nft: NFT;
  onBuy?: (nft: NFT) => void;
  onList?: (nft: NFT) => void;
  onUnlist?: (nft: NFT) => void;
  isLoading?: boolean;
}

export function NFTCard({
  nft,
  onBuy,
  onList,
  onUnlist,
  isLoading,
}: NFTCardProps) {
  const { address } = useAccount();
  const [imageError, setImageError] = useState(false);

  const isOwner = address && nft.owner.toLowerCase() === address.toLowerCase();
  const canBuy = nft.isListed && !isOwner;
  const canList = isOwner && !nft.isListed;
  const canUnlist = isOwner && nft.isListed;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square relative bg-gray-100">
          {!imageError ? (
            <Image
              src={nft.image}
              alt={nft.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>Image not available</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 truncate">{nft.name}</CardTitle>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {nft.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Token #{nft.tokenId}</span>
          <span>
            Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {nft.price && (
          <div className="w-full text-center">
            <span className="text-lg font-bold">
              {formatEther(BigInt(nft.price))} ETH
            </span>
          </div>
        )}

        <div className="w-full flex gap-2">
          {canBuy && (
            <Button
              onClick={() => onBuy?.(nft)}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Buying..." : "Buy Now"}
            </Button>
          )}

          {canList && (
            <Button
              onClick={() => onList?.(nft)}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              List for Sale
            </Button>
          )}

          {canUnlist && (
            <Button
              onClick={() => onUnlist?.(nft)}
              variant="destructive"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Unlisting..." : "Unlist"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
