import { auth } from "@/auth";

export const isAuthenticated = async ()=>{
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User must be logged in to favorite a meme");
    }
    return userId;
  }