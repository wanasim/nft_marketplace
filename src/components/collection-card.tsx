"use client";

import { useReadContracts } from "wagmi";
import { CONTRACTS } from "@/contracts/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CollectionCardProps {
  address: `0x${string}`;
  name: string;
  symbol: string;
}

export function CollectionCard({ address, name, symbol }: CollectionCardProps) {
  const router = useRouter();
  const { data: nftCount } = useReadContracts({
    contracts: [
      {
        address,
        abi: CONTRACTS.NFTFactory.abi,
        functionName: "balanceOf",
        args: [address],
      },
    ],
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <span className="text-sm text-gray-500">{symbol}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Address: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <p className="text-sm text-gray-500">
            NFTs: {nftCount?.[0]?.result?.toString() || "0"}
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/collection/${address}`)}
            >
              View Collection
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push(`/mint?collection=${address}`)}
            >
              Mint NFT
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
