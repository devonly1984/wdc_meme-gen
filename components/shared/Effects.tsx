import { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
interface EffectsProps {
  blur: boolean;
  setBlur: Dispatch<SetStateAction<boolean>>;
  sharpen: boolean;
  setSharpen: Dispatch<SetStateAction<boolean>>;
  grayscale: boolean;
  setGrayscale: Dispatch<SetStateAction<boolean>>;
}
const Effects = ({blur,setBlur,sharpen,setSharpen,grayscale,setGrayscale}:EffectsProps) => {
  return (
    <Card className="p-4 space-y-4">
              <h2 className="text-xl ">Effects</h2>
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <Checkbox
                    id="blur"
                    checked={blur}
                    onCheckedChange={(v) => {
                      setBlur(v as boolean);
                    }}
                  />
                  <Label
                    htmlFor="blur"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Blur
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    id="sharpen"
                    checked={sharpen}
                    onCheckedChange={(v) => {
                      setSharpen(v as boolean);
                    }}
                  />
                  <Label
                    htmlFor="sharpen"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sharpen
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Checkbox
                    id="grayscale"
                    checked={grayscale}
                    onCheckedChange={(v) => {
                      setGrayscale(v as boolean);
                    }}
                  />
                  <Label
                    htmlFor="grayscale"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Grayscale
                  </Label>
                </div>
              </div>
            </Card>
  )
}
export default Effects