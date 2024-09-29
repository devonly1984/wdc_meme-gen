import { getFavoritesByUser} from "@/actions/Meme.actions";
import FavoritesList from "@/components/lists/FavoritesList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";



import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const FavoritesPage = async () => {
  unstable_noStore();
 const favoritesByUser = await getFavoritesByUser();
  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Favorites</h1>
      </div>
      {favoritesByUser.length === 0 ? (
        <Card className=" py-8 flex flex-col items-center justify-center gap-4">
          <Image
            src="/emptyState.svg"
            alt="Empty State "
            width={200}
            height={200}
          />
          <p>You haven&apos;t favorited any memes</p>
          <Button asChild>
            <Link href="/search?q=">Find some memes</Link>
          </Button>
        </Card>
      ) : (
        <FavoritesList favorites={favoritesByUser} />
      )}
    </div>
  );
};
export default FavoritesPage;
