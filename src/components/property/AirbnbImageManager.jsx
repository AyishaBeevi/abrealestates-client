import React from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ img, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="relative group rounded-lg overflow-hidden"
    >
      <img
        src={img.preview}
        alt="img"
        className="w-full h-32 object-cover rounded-lg border"
      />

      {/* Remove button */}
      <button
        onClick={() => onRemove(img.id)}
        className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>

      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}

export default function AirbnbImageManager({ images, setImages }) {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);

    setImages(arrayMove(images, oldIndex, newIndex));
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <SortableItem key={img.id} img={img} onRemove={removeImage} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
