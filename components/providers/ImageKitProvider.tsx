"use client"
import { publicKey, urlEndpoint } from "@/constants"
import { authenticator } from "@/lib/imagekit"
import { ImageKitProvider } from "imagekitio-next"
import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
const Providers = ({children}:{children:ReactNode}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </ThemeProvider>
  );
}
export default Providers