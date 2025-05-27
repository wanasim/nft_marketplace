import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, sepolia, localhost, anvil } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "NFT Marketplace",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string, // Get this from WalletConnect Cloud
  chains: [sepolia, anvil],
  transports: {
    [anvil.id]: http(process.env.ANVIL_RPC_URL as string),
    [sepolia.id]: http(process.env.SEPOLIA_RPC_URL as string),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const ANVIL_CHAIN = {
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["http://127.0.0.1:8545"] },
    default: { http: ["http://127.0.0.1:8545"] },
  },
} as const;
