"use client"

import { FileObject } from "imagekit/dist/libs/interfaces"
import { IKImage } from "imagekitio-next"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const ResultsList = ({files}:{files:FileObject[]}) => {
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {files.map((file) => (
          <Card key={file.fileId}>
            <CardHeader>
              <CardTitle>
                {file.customMetadata?.displayName ?? file.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IKImage
                path={file.filePath}
                alt={file.name}
                width={300}
                height={300}
              />
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/customize/${file.fileId}`}>Customize</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );

}
export default ResultsList