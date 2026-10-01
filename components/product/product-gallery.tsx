"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
}

interface ZoomOrigin {
  x: number;
  y: number;
}

const ZOOM_SCALE = 2;

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState<ZoomOrigin | null>(null);
  const selectedImage = images[selectedIndex];

  // El zoom sigue al cursor: el punto bajo el mouse queda fijo al ampliar.
  const updateZoomOrigin = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setZoomOrigin({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-square cursor-zoom-in overflow-hidden rounded-sm bg-overlay"
        onMouseMove={updateZoomOrigin}
        onMouseLeave={() => setZoomOrigin(null)}
      >
        <Image
          key={selectedImage.src}
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain transition-transform duration-200"
          style={
            zoomOrigin
              ? { transform: `scale(${ZOOM_SCALE})`, transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-3">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Ver foto ${index + 1}: ${image.alt}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden rounded-sm bg-overlay ring-offset-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <Image src={image.src} alt="" fill sizes="10vw" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
