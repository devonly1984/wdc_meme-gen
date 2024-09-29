import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { favoriteMeme } from "@/actions/Meme.actions";
import {HeartFilledIcon} from '@radix-ui/react-icons'
const FavoriteButton = ({
  isFavorited,
  fileId,
  filePath,
  pathToRevalidate
}: {
  isFavorited: boolean;
  fileId: string;
  filePath: string;
  pathToRevalidate:string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form
            action={async () => {
              await favoriteMeme(fileId, filePath, pathToRevalidate);
            }}
          >
            <Button type="submit" variant={"outline"}>
              {isFavorited ? <HeartFilledIcon /> : <Heart />}
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavorited ? "Unfavorite" : "Favorite"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default FavoriteButton