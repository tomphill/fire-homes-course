"use client";

import { useCallback, useRef } from "react";
import { Button } from "./ui/button";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { MoveIcon, XIcon } from "lucide-react";

export type ImageUpload = {
  id: string;
  url: string;
  file?: File;
};

type Props = {
  images?: ImageUpload[];
  onImagesChange: (images: ImageUpload[]) => void;
  urlFormatter?: (image: ImageUpload) => string;
};

export default function MultiImageUploader({
  images = [],
  onImagesChange,
  urlFormatter,
}: Props) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  console.log({ images });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file, index) => {
      return {
        id: `${Date.now()}-${index}-${file.name}`,
        url: URL.createObjectURL(file),
        file,
      };
    });

    onImagesChange([...images, ...newImages]);
  };

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const items = Array.from(images);
      const [reorderedImage] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedImage);
      onImagesChange(items);
    },
    [onImagesChange, images]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updatedImages = images.filter((image) => image.id !== id);
      onImagesChange(updatedImages);
    },
    [onImagesChange, images]
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <input
        className="hidden"
        ref={uploadInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
      />
      <Button
        className="w-full"
        variant="outline"
        type="button"
        onClick={() => uploadInputRef?.current?.click()}
      >
        Upload images
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="property-images" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="relative p-2"
                    >
                      <div className="bg-gray-100 rounded-lg flex gap-2 items-center overflow-hidden">
                        <div className="size-16 w-16 h-16 relative">
                          <Image
                            src={urlFormatter ? urlFormatter(image) : image.url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium">
                            Image {index + 1}
                          </p>
                          {index === 0 && (
                            <Badge variant="success">Featured Image</Badge>
                          )}
                        </div>
                        <div className="flex items-center p-2">
                          <button
                            className="text-red-500 p-2"
                            onClick={() => handleDelete(image.id)}
                          >
                            <XIcon />
                          </button>
                          <div className="text-gray-500">
                            <MoveIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
