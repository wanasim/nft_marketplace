import { MintNFTForm } from "@/components/mint-nft-form";

export default function MintPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Mint Your NFT</h1>
      <MintNFTForm />
    </div>
  );
}
