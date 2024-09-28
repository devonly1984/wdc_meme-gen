import { imagekit } from "@/app/lib/imagekit";
import CustomizePanel from "@/components/shared/CustomizePanel";

const CustomizePage = async ({params}:{params:{fileId:string}}) => {
  const file = await imagekit.getFileDetails(params?.fileId)

  return (
    <div className="container mx-auto space-y-8 py-8 px-4">
      <CustomizePanel
        file={{
          filePath: file.filePath,
          fileId: file.fileId,
          name: file.name,
        }}
      />
    </div>
  );
};
export default CustomizePage;
