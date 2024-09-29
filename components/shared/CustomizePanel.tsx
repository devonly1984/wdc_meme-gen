"use client";
import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";

import { useCallback, useState } from "react";
import TextOverlay from "./TextOverlay";
import { Button } from "../ui/button";
import {debounce} from 'lodash'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Download } from "lucide-react";
import Effects from "./Effects";

import FavoriteButton from "../buttons/FavoriteButton";
const CustomizePanel = ({
  file,
  isFavorited,
  isAuthenticated
}: {
  file: Pick<FileObject, "filePath" | "fileId" | "name">,
  isFavorited:boolean,
  isAuthenticated:boolean
}) => {
  const [textTransformations, setTextTransformations] = useState<
    Record<string, { raw: string }>
  >({});
  const textTransformationsArray = Object.values(textTransformations);
  const [numberOfOverlays, setNumberOfOverlays] = useState(1);
  const [blur, setBlur] = useState(false);
  const [sharpen, setSharpen] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const onUpdate = useCallback(
    debounce(
      (
        index: number,
        text: string,
        x: number,
        y: number,

        bgColor?: string
      ) => {
        if (text) {
          setTextTransformations((currrent) => ({
            ...currrent,
            [`text${index}`]: {
              raw: `l-text,i-${text ?? " "},${
                bgColor ? `bg-${bgColor},pa-10,` : ""
              }fs-15,lx-bw_mul_${x.toFixed(2)},ly-bw_mul_${y.toFixed(2)},l-end`,
            },
          }));
        }
      },
      250
    ),
    []
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Customize</h1>
        <div className="flex gap-4 justify-end">
          {isAuthenticated && (
            <FavoriteButton
              isFavorited={isFavorited}
              fileId={file.fileId}
              filePath={file.filePath}
              pathToRevalidate={`/customize/${file.fileId}`}
            />
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={async () => {
                    const image = document.querySelector("#meme img");
                    const src = image?.getAttribute("src");
                    if (!src) return;
                    const response = await fetch(src);
                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    const a = document.createElement("a");
                    a.href = imageUrl;
                    a.download = file.name;
                    a.click();
                  }}
                >
                  <Download />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Effects
              blur={blur}
              setBlur={setBlur}
              sharpen={sharpen}
              setSharpen={setSharpen}
              grayscale={grayscale}
              setGrayscale={setGrayscale}
            />
          </div>
          {new Array(numberOfOverlays).fill("").map((_, index) => (
            <TextOverlay key={index} index={index + 1} onUpdate={onUpdate} />
          ))}
          <Button onClick={() => setNumberOfOverlays(numberOfOverlays + 1)}>
            Add Overlay
          </Button>
          {numberOfOverlays > 1 && (
            <Button
              onClick={() => {
                setNumberOfOverlays(numberOfOverlays - 1);
                const lastIndex = numberOfOverlays - 1;
                setTextTransformations((current) => {
                  const newCurr = { ...current };
                  delete newCurr[`text${lastIndex}`];
                  return newCurr;
                });
              }}
              variant={"destructive"}
            >
              Remove Overlay
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4 self-end">
          <div className="" id="meme">
            <IKImage
              path={file.filePath}
              alt={file.fileId}
              width={550}
              height={550}
              transformation={
                [
                  blur ? { raw: "bl-2" } : undefined,
                  sharpen ? { raw: "e-sharpen-3" } : undefined,
                  grayscale ? { raw: "e-grayscale-2" } : undefined,
                  ...textTransformationsArray,
                ].filter(Boolean) as any
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomizePanel;
