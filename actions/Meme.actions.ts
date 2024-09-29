"use server"


import { db } from "@/drizzle/neondb";
import { favorites } from "@/drizzle/schema";
import { isAuthenticated } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const favoriteMeme = async(fileId:string,filePath:string,pathToRevalidate:string)=>{
const userId = await isAuthenticated();
  try {
    const favoriteExists = await db.query.favorites.findFirst({
        where: and(eq(favorites.userId,userId),eq(favorites.memeId,fileId))
    })
    if (!favoriteExists) {
    await db.insert(favorites).values({
      userId,
      memeId: fileId,
      filePath: filePath

    });
} else {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));
}
revalidatePath(pathToRevalidate);
  } catch (error) {
    console.log(error);
  }
}
export const getFavoriteStatus = async(fileId:string)=>{
const userId = await isAuthenticated();
  const favoriteStatus = await db.query.favorites.findFirst({
    where: and(eq(favorites.userId,userId),eq(favorites.memeId,fileId))
  })
  return !!favoriteStatus;
}
export const getFavoritesByUser = async()=>{
  const userId= await isAuthenticated();
  const favoritesByUser = await db.query.favorites.findMany({
    where: eq(favorites.userId,userId)
  })
  return favoritesByUser;
}