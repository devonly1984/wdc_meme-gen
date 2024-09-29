"use client"

import { IKImage } from "imagekitio-next"
import { Card, CardContent, CardFooter} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Favorite } from "@/drizzle/schema";
import FavoriteButton from "../buttons/FavoriteButton";

const FavoritesList = ({favorites}:{favorites:Favorite[]}) => {
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {favorites.map((favorite) => (
          <Card key={favorite.userId}>
            <CardContent>
              <IKImage
                path={favorite.filePath}
                alt={"a meme"}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/customize/${favorite.memeId}`}>Customize</Link>
              </Button>
              <FavoriteButton
                fileId={favorite.memeId}
                filePath={favorite.filePath}
                isFavorited={true}
                pathToRevalidate="/favorites"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    );

}
export default FavoritesList