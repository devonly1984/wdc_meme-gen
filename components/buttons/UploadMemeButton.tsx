"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { IKUpload } from "imagekitio-next";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
  
const UploadMemeButton = () => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const router = useRouter()
    const [displayName,setDisplayName] = useState("")
    const [isUploading, setIsUploading] = useState(false);
    const [tags, setTags] = useState("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Upload Base Meme</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your meme image</DialogTitle>
          <DialogDescription>
            This is meme image anyone on the site can build upon
          </DialogDescription>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setIsUploading(true);
              uploadRef.current?.click();
            }}
          >
            <div>
              <div className="mb-4">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="Display Name"
                  required
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Comma delimited list of tags"
                  required
                  value={tags}
                  onChange={(e) => {
                    setTags(e.target.value);
                  }}
                />
              </div>
              <IKUpload
                fileName="test-upload.png"
                customMetadata={{
                  displayName,
                }}
                tags={[displayName, ...tags.split(",")]}
                onError={(error) => {
                  setIsUploading(false);
                  console.log(error);
                }}
                onSuccess={(response) => {
                  setIsUploading(false);
                  router.push(`/customize/${response.fileId}`);
                }}
                style={{ display: "none" }}
                ref={uploadRef}
              />
            </div>
            <DialogFooter className=" flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <Spinner /> : "Select and Upload Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export default UploadMemeButton