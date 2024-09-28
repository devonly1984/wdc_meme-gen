import { privateKey, publicKey, urlEndpoint } from "@/constants";
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: publicKey!,
  privateKey: privateKey!,
  urlEndpoint: urlEndpoint!,
});