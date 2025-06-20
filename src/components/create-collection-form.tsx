"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { CONTRACTS } from "@/contracts/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function CreateCollectionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { writeContract } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!writeContract) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const symbol = formData.get("symbol") as string;

    if (!name || !symbol) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const hash = await writeContract({
        ...CONTRACTS.CollectionsFactory,
        functionName: "createCollection",
        args: [name, symbol],
      });
      toast.success("Collection created successfully!");
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("Failed to create collection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Collection Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="My Awesome Collection"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="symbol">Collection Symbol</Label>
        <Input id="symbol" name="symbol" placeholder="MAC" required />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Collection"}
      </Button>
    </form>
  );
}
