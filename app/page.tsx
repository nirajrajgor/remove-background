'use client';

import Image from "next/image";
import { useState, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiSliders, FiDownload, FiX } from "react-icons/fi";

type ImagePair = {
  id: string;
  original: File;
  processed: string | null;
};

export default function Home() {
  const [imagePairs, setImagePairs] = useState<ImagePair[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState<number>(85);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPairs = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        original: file,
        processed: null
      }));
      setImagePairs(prev => [...prev, ...newPairs]);
    }
  }, []);

  const handleRemoveBackground = useCallback(async () => {
    if (imagePairs.length === 0) return;

    setIsProcessing(true);
    try {
      const updatedPairs = await Promise.all(
        imagePairs.map(async (pair) => {
          if (pair.processed) return pair;
          const blob = await removeBackground(pair.original, {
            output: { quality: quality / 100 },
          });
          const url = URL.createObjectURL(blob);
          return { ...pair, processed: url };
        })
      );
      setImagePairs(updatedPairs);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [imagePairs, quality]);

  const handleRemoveImage = useCallback((id: string) => {
    setImagePairs(prev => prev.filter(pair => pair.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-900">
          Background Removal Tool
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 lg:col-span-1"
            >
              <h2 className="text-2xl font-semibold mb-4 text-indigo-900">Upload Images</h2>
              <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  multiple
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <FiUpload className="mx-auto text-4xl text-indigo-500 mb-4" />
                  <span className="text-indigo-900">Drag & Drop or Click to Upload Multiple Images</span>
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
                disabled={imagePairs.length === 0 || isProcessing}
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

            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {imagePairs.map((pair) => (
                  <motion.div
                    key={pair.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 p-4 rounded-xl relative"
                  >
                    <button
                      onClick={() => handleRemoveImage(pair.id)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={20} />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-indigo-900">Original</h3>
                        <Image
                          src={URL.createObjectURL(pair.original)}
                          alt="Original"
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-indigo-900">Processed</h3>
                        {pair.processed ? (
                          <>
                            <Image
                              src={pair.processed}
                              alt="Processed"
                              width={400}
                              height={300}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <a
                              href={pair.processed}
                              download={`processed_${pair.original.name}`}
                              className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800"
                            >
                              <FiDownload className="mr-1" />
                              Download
                            </a>
                          </>
                        ) : (
                          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                            Not processed yet
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
