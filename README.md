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

To deploy contracts to a local Anvil instance:

1. Start Anvil in a separate terminal:
```bash
anvil
```

2. Deploy contracts:
```bash
cd foundry
forge script script/Deploy.s.sol:DeployScript --rpc-url http://localhost:8545 --broadcast --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

### Sepolia Deployment

To deploy to Sepolia testnet:

1. Set up environment variables:
```bash
# foundry/.env
PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/1ErRyLOv8ZMeI_n3otIQH1BJ7pboy16V
```

2. Deploy contracts:
```bash
cd foundry
forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

## Frontend Development

Start the development server:
```bash
pnpm dev
```

## License MIT


## TO-DO: 
1. Fix base components and styling. 
2. Add create functionality and allow users to upload their own pics of the NFT (if that's the way it's supposed to work. ) 
    2.1. Implement IPFS for metadata storage if this is the ideal way.  
3. Deploy the contracts to Anvil using the commands in the README
4. Replace the mock data with actual contract calls
5. Add The Graph subgraph for indexing
6. Add more advanced features like auctions, offers, etc.

Ambitious:
7. Add a frontend for the marketplace
7. Add a backend for the marketplace
8. Add a database for the marketplace
9. Add a payment gateway for the marketplace
10. Add a notification system for the marketplace