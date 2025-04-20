"use client";

import { useState, use, useEffect } from "react";
import { ChoiceChip } from "../../../components/ChoiceChip";
import { GERMAN_ARTICLES } from "../../../lib/levels";
import { useVocaContext } from "./context";
import { useRouter } from "next/navigation";

//TODO: refactoring this page

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function LevelClientPage({
  currentLevel,
}: {
  currentLevel: string;
}) {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const articles = GERMAN_ARTICLES;
  const vocabularyPromise = useVocaContext();
  const vocabulary = use(vocabularyPromise);

  const [shuffledVocas] = useState(() => shuffleArray(vocabulary));
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = shuffledVocas[currentIndex];
  const correctArticle = currentWord?.article;

  useEffect(() => {
    if (currentIndex >= shuffledVocas.length) {
      router.push(`/level/${currentLevel}/completed`);
    }
  }, [currentIndex, shuffledVocas.length, currentLevel, router]);

  if (currentIndex >= shuffledVocas.length) return null;

  const handleDragStart = (e: React.DragEvent, article: string) => {
    setSelectedArticle(article);
    e.dataTransfer.setData("text/plain", article);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedArticle = e.dataTransfer.getData("text/plain");
    if (droppedArticle === correctArticle) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setSelectedArticle(null);
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
    } else {
      setSelectedArticle(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-4xl mb-8 font-bold">Level {currentLevel}</h1>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="text-6xl font-bold px-12 py-8 animate-fade-in text-black">
            Correct! 🎉
          </div>
        </div>
      )}
      <div className="bg-gray-200 w-full max-w-xl p-6 rounded-xl">
        <div className="min-h-[80px] p-4 flex flex-wrap gap-3">
          {articles.map((article) => (
            <ChoiceChip
              label={article}
              key={article}
              draggable
              onDragStart={(e) => handleDragStart(e, article)}
              style={{ opacity: selectedArticle === article ? 0.5 : 1 }}
            >
              {article}
            </ChoiceChip>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex items-center"
          >
            <ChoiceChip
              className={`bg-yellow-200 hover:bg-yellow-400 mr-8 ${
                selectedArticle === correctArticle ? "bg-pink-600" : ""
              }`}
              label={selectedArticle || ""}
            >
              {selectedArticle === correctArticle ? selectedArticle : ""}
            </ChoiceChip>
            <span className="text-2xl">
              {currentWord.word} ({currentWord.translation})
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
