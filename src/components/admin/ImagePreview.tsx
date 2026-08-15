"use client";

import { useState } from "react";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImagePreview({ src, alt = "Preview", className = "" }: ImagePreviewProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`flex h-20 w-32 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-100 ${className}`}>
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`max-h-32 rounded border border-gray-200 object-contain ${className}`}
    />
  );
}
