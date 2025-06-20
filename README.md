# NFT Marketplace

A full-stack NFT marketplace built with Next.js, Foundry, and The Graph.

## Project Structure

- `foundry/` - Smart contracts and deployment scripts
- `src/` - Next.js frontend application
- `subgraph/` - The Graph subgraph for indexing (coming soon)

## Smart Contracts

The project includes two main contracts:
- `NFT.sol`: ERC721 token contract for minting NFTs
- `Marketplace.sol`: Contract for listing and buying NFTs

## Local Development

### Prerequisites

- Node.js (v18+)
- pnpm
- Foundry (forge, anvil, cast)

### Setup

1. Install dependencies:
```bash
pnpm install
```

2. Install Foundry dependencies:
```bash
cd foundry
forge install
```

### Local Deployment

#### Method 1: Using Deploy Script
To deploy contracts to a local Anvil instance using the deploy script:

1. Start Anvil in a separate terminal:
```bash
anvil
```

2. Deploy contracts:
```bash
cd foundry
forge script script/Deploy.s.sol:DeployScript --rpc-url $ANVIL_RPC_URL --broadcast --private-key $ANVIL_PRIVATE_KEY
```

#### Method 2: Manual Deployment
To deploy contracts manually using Forge:

1. Start Anvil in a separate terminal:
```bash
anvil
```

2. Deploy NFT contract:
```bash
cd foundry
forge create src/NFT.sol:NFT --rpc-url $ANVIL_RPC_URL --private-key $ANVIL_PRIVATE_KEY --constructor-args "NFT Marketplace" "NFTM"
```

3. Deploy Marketplace contract (replace NFT_ADDRESS with the address from step 2):
```bash
forge create src/Marketplace.sol:Marketplace --rpc-url $ANVIL_RPC_URL --private-key $ANVIL_PRIVATE_KEY --constructor-args NFT_ADDRESS
```

### Sepolia Deployment

#### Method 1: Using Deploy Script
To deploy to Sepolia testnet using the deploy script:

1. Set up environment variables:
```bash
# foundry/.env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

2. Deploy contracts:
```bash
cd foundry
forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

#### Method 2: Manual Deployment
To deploy to Sepolia testnet manually:

1. Set up environment variables:
```bash
# foundry/.env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

2. Deploy NFT contract:
```bash
cd foundry
forge create src/NFT.sol:NFT --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --constructor-args "NFT Marketplace" "NFTM" --verify
```

3. Deploy Marketplace contract (replace NFT_ADDRESS with the address from step 2):
```bash
forge create src/Marketplace.sol:Marketplace --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --constructor-args NFT_ADDRESS --verify
```

## Frontend Development

Start the development server:
```bash
pnpm dev
```

## License MIT


## TO-DO: 
1. collections and other contract changes
2. consolidate create pages + forms
3. Fix base components and styling. 
4. Add create functionality and allow users to upload their own pics of the NFT (if that's the way it's supposed to work. ) 
    4.1. Implement IPFS for metadata storage if this is the ideal way.
5. Add delisting, buy, etc. functionality for nfts      
5. Deploy the contracts to Anvil using the commands in the README
4. Replace the mock data with actual contract calls
5. Add The Graph subgraph for indexing
6. Add more advanced features like most recent nfts, auctions, offers, etc.

Ambitious:
7. Add a frontend for the marketplace
7. Add a backend for the marketplace
8. Add a database for the marketplace
9. Add a payment gateway for the marketplace
10. Add a notification system for the marketplace