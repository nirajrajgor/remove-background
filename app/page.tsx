'use client';

import Image from "next/image";
import { useState } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState<number>(85);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProcessedImage(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    try {
      const blob = await removeBackground(selectedImage, {
        output: { quality: (quality / 100) },
      });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-3xl font-bold">Background Removal Tool</h1>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {selectedImage && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Original Image</h2>
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                width={300}
                height={300}
                objectFit="contain"
              />
            </div>
            {processedImage && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">Processed Image</h2>
                <Image
                  src={processedImage}
                  alt="Processed Image"
                  width={300}
                  height={300}
                  objectFit="contain"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <div className="flex items-center gap-4 w-full">
              <span className="w-24">Quality: {quality}%</span>
              <input
                type="range"
                min="70"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={handleRemoveBackground}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isProcessing ? "Processing..." : "Remove Background"}
            </button>
          </div>
        </div>
      )}

      {processedImage && (
        <a
          href={processedImage}
          download="processed_image.png"
          className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download Processed Image
        </a>
      )}
    </div>
  );
}
