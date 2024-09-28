"use server"

import { auth } from "@/auth"
import { db } from "@/drizzle/neondb";
import { favorites } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const favoriteMeme = async(fileId:string)=>{
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User must be logged in to favorite a meme");
  }
  try {
    const favoriteExists = await db.query.favorites.findFirst({
        where: and(eq(favorites.userId,userId),eq(favorites.memeId,fileId))
    })
    if (!favoriteExists) {
    await db.insert(favorites).values({
      userId,
      memeId: fileId,

    });
} else {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));
}
revalidatePath(`/customize/${fileId}`);
  } catch (error) {
    console.log(error);
  }
}