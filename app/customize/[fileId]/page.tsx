import { getFavoriteStatus } from "@/actions/Meme.actions";
import { imagekit } from "@/app/lib/imagekit";
import { auth } from "@/auth";
import CustomizePanel from "@/components/shared/CustomizePanel";

const CustomizePage = async ({params}:{params:{fileId:string}}) => {
  const session = await auth();
  const file = await imagekit.getFileDetails(params?.fileId)
  const isFavorited = session ? await getFavoriteStatus(params?.fileId) : false;
  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <CustomizePanel
        file={{
          filePath: file.filePath,
          fileId: file.fileId,
          name: file.name,
        }}
        isAuthenticated={!!session}
        isFavorited={isFavorited}
      />
    </div>
  );
};
export default CustomizePage;
