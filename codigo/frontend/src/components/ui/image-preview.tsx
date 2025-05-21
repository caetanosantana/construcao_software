"use client";

import { use } from "react";

export function ImagePreview({
  imageReader,
}: {
  imageReader: Promise<FileReader>;
}) {
  const reader = use(imageReader);
  const data = reader.result as string;

  if (!data) {
    return <>Sem dados</>;
  }

  return (
    <div className="w-full flex justify-center">
      <picture>
        <img
          src={data}
          alt="Preview"
          className="w-full h-auto object-cover rounded-lg"
        />
      </picture>
    </div>
  );
}
