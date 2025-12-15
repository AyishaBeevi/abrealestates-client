// client/components/property/ImageReorderPreview.jsx

import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ImageReorderPreview({ images, setImages }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    setImages(reordered);
  };

  // ⭐ Make image cover: move it to index 0
  const makeCover = (index) => {
    const updated = [...images];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setImages(updated);
  };

  // ⭐ Remove image
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => (
          <div
            className="flex gap-4 overflow-x-auto py-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((img, index) => (
              <Draggable key={img.id} draggableId={img.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="relative w-32 h-32 rounded-md overflow-hidden border shadow-md flex-shrink-0"
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />

                    {/* ⭐ COVER BADGE */}
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        COVER
                      </span>
                    )}

                    {/* ⭐ Set as cover button */}
                    <button
                      onClick={() => makeCover(index)}
                      className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                      Make Cover
                    </button>

                    {/* ❌ Remove button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
