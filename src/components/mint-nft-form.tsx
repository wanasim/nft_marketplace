"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MintNFTFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    price: string;
    image: File;
  }) => void;
  isLoading: boolean;
}

export function MintNFTForm({ onSubmit, isLoading }: MintNFTFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    onSubmit({ ...formData, image });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">NFT Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price (ETH)</Label>
        <Input
          id="price"
          type="number"
          step="0.001"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">NFT Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Preview"
              className="h-48 w-48 rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn("w-full", isLoading && "opacity-50 cursor-not-allowed")}
      >
        {isLoading ? "Loading..." : "Create NFT"}
      </Button>
    </form>
  );
}
