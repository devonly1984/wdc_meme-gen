"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {TwitterPicker} from 'react-color'


const TextOverlay = ({
  index,
  onUpdate,
}: {
  index: number;
  onUpdate: (
    index: number,
    text: string,
    x: number,
    y: number,
    bgColor?: string
  ) => void;
}) => {
  const [textOverlay, setTextOverlay] = useState("");
  const [textOverlayXPosition, setTextOverlayXPosition] = useState(0);
  const [textOverlayYPosition, setTextOverlayYPosition] = useState(0);
  const [applyTextBackground, setApplyTextBackground] = useState(false);
  const [textbgColor, setTextBgColor] = useState("#000000");
  const bgColor = applyTextBackground
    ? textbgColor.replace("#", "")
    : undefined;
  const xPositionDecimal = textOverlayXPosition / 100;
  const yPositionDecimal = textOverlayYPosition / 100;
  useEffect(() => {
    onUpdate(index, textOverlay??" ", xPositionDecimal, yPositionDecimal, bgColor);
  }, [
    index,
    textOverlay,
    xPositionDecimal,
    yPositionDecimal,
    bgColor,
    onUpdate,
  ]);
  return (
    <Card className="p-4 space-y-4">
      <div className="flex justify-between gap-8">
        <div className="flex-grow ">
          <Label htmlFor="textOverlay">Text Overlay {index} </Label>
          <Input
            id={`textOverlay${index}`}
            value={textOverlay}
            onChange={(e) => {
              setTextOverlay(e.target.value);
              onUpdate(
                index,
                textOverlay??" ",
                xPositionDecimal,
                yPositionDecimal,
                applyTextBackground ? textbgColor.replace("#", "") : undefined
              );
            }}
          />
        </div>
        <div className="flex items-center space-x-2 flex-col space-y-4">
          <div className="flex gap-4">
            <Checkbox
              checked={applyTextBackground}
              onCheckedChange={(v) => {
                setApplyTextBackground(v as boolean);
                onUpdate(
                  index,
                  textOverlay??" ",
                  xPositionDecimal,
                  yPositionDecimal,
                  applyTextBackground ? textbgColor.replace("#", "") : undefined
                );
              }}
            />
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Apply Text Background
            </Label>
          </div>
          {applyTextBackground && (
            <TwitterPicker
              color={textbgColor}
              onChange={(value) => {
                setTextBgColor(value.hex);
                onUpdate(
                  index,
                  textOverlay,
                  xPositionDecimal,
                  yPositionDecimal,
                  applyTextBackground ? value.hex.replace("#", "") : undefined
                );
              }}
            />
          )}
        </div>
      </div>
      <div className="">
        <Label htmlFor={`textOverlayX${index}Position`}>
          Text Overlay X {index} Position
        </Label>
        <Slider
          id={`textOverlayX${index}Position`}
          value={[textOverlayXPosition]}
          onValueChange={([v]) => {
            setTextOverlayXPosition(v);
            onUpdate(
              index,
              textOverlay,
              v / 100,
              textOverlayXPosition,
              bgColor
            );
          }}
        />
      </div>
      <div className="">
        <Label htmlFor={`textOverlayX${index}Position`}>
          Text Overlay Y {index} Position
        </Label>
        <Slider
          id={`textOverlayX${index}Position`}
          value={[textOverlayYPosition]}
          onValueChange={([v]) => {
            setTextOverlayYPosition(v);
            onUpdate(
              index,
              textOverlay,
              textOverlayXPosition,
              v / 100,
              bgColor
            );
          }}
        />
      </div>
    </Card>
  );
};
export default TextOverlay