"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useNFTContract } from "@/hooks/useNFTContract";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MintNFTForm() {
  const { address } = useAccount();
  const { mintNFT, isMinting } = useNFTContract();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !image) return;

    try {
      // TODO: Upload image to IPFS and get the URI
      const imageURI = "ipfs://your-image-hash";

      // Create metadata JSON
      const metadata = {
        name,
        description,
        image: imageURI,
      };

      // TODO: Upload metadata to IPFS and get the URI
      const metadataURI = "ipfs://your-metadata-hash";

      // Mint NFT
      await mintNFT(address, metadataURI);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mint New NFT</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isMinting}>
            {isMinting ? "Minting..." : "Mint NFT"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
