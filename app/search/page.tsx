import { imagekit } from "@/app/lib/imagekit";
import ResultsList from "@/components/lists/ResultsList";
import UploadMemeButton from "@/components/buttons/UploadMemeButton";

import { unstable_noStore } from "next/cache";
import { getFavoriteCounts } from "@/actions/Meme.actions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string };
}) => {
  unstable_noStore();
  const files = await imagekit.listFiles({
    tags: searchParams.q,
  });
  const favoriteCounts = await getFavoriteCounts(
    files.map((file) => file.fileId)
  );
  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Search Results</h1>
        <UploadMemeButton />
      </div>
      <ResultsList files={files} counts={favoriteCounts} />
    </div>
  );
};
export default SearchPage;
