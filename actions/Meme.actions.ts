"use server"


import { db } from "@/drizzle/neondb";
import { favoriteCounts, favorites } from "@/drizzle/schema";
import { isAuthenticated } from "../app/lib/utils";
import { and, eq, inArray, sql } from "drizzle-orm";
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
    await db
      .insert(favoriteCounts)
      .values({
        memeId: fileId,
        count: 1 ,
      })
      .onConflictDoUpdate({
        set: {
          count: sql`${favoriteCounts.count}+1`,
        },
        target: favoriteCounts.memeId,
      });
} else {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));
      await db
        .update(favoriteCounts)
        .set({
          count: sql`${favoriteCounts.count}-1`,
        })
        .where(eq(favoriteCounts.memeId, fileId));
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
export const getFavoriteCounts = async(fileIds:string[])=>{
  const counts = await db
    .select()
    .from(favoriteCounts)
    .where(inArray(favoriteCounts.memeId, fileIds));
  return counts;
}