export interface NFT {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  creator: string;
  contractAddress: string;
  price?: string;
  isListed: boolean;
  listingId?: string;
}

export interface Listing {
  id: string;
  tokenId: string;
  seller: string;
  price: string;
  active: boolean;
  nft: NFT;
}

export interface CreateNFTData {
  name: string;
  description: string;
  image: File;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}
