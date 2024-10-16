'use client';

import Image from "next/image";
import { useState, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";
import { motion } from "framer-motion";
import { FiUpload, FiSliders, FiDownload } from "react-icons/fi";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState<number>(85);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProcessedImage(null);
    }
  }, []);

  const handleRemoveBackground = useCallback(async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    try {
      const blob = await removeBackground(selectedImage, {
        output: { quality: quality / 100 },
      });
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, quality]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-900">
          Background Removal Tool
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Upload Image</h2>
              <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <FiUpload className="mx-auto text-4xl text-indigo-500 mb-4" />
                  <span className="text-indigo-900">Drag & Drop or Click to Upload</span>
                </label>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-indigo-900">Quality</label>
                  <span className="text-sm font-semibold text-indigo-600">{quality}%</span>
                </div>
                <div className="flex items-center">
                  <FiSliders className="text-indigo-500 mr-2" />
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <button
                onClick={handleRemoveBackground}
                disabled={!selectedImage || isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span>Remove Background</span>
                )}
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 p-4 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-900">Original Image</h3>
                {selectedImage ? (
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 p-4 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-900">Processed Image</h3>
                {processedImage ? (
                  <>
                    <Image
                      src={processedImage}
                      alt="Processed"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <a
                      href={processedImage}
                      download="processed_image.png"
                      className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <FiDownload className="mr-2" />
                      Download Processed Image
                    </a>
                  </>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    No processed image yet
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
