

import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from 'next-auth/providers/google'
import { db } from "./drizzle/neondb"; 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
        clientId: process.env.AUTH_CLIENT_ID,
        clientSecret: process.env.AUTH_CLIENT_SECRET
    })
  ],
})