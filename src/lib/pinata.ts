import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "salmon-glad-haddock-696.mypinata.cloud",
});

export async function pinFileToIPFS(file: File, name: string): Promise<string> {
  try {
    const result = await pinata.upload.public.file(file).name(name);
    console.log("uploaded to pinata", result);
    return result.id;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw new Error("Failed to upload to IPFS");
  }
}
