"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ChoiceChip } from "../../../components/ChoiceChip";
import { GERMAN_ARTICLES } from "../../../lib/levels";

export default function Level() {
  const articles = GERMAN_ARTICLES;
  const params = useParams();
  const currentLevel = params.slug;
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const correctArticle = "Die"; // This would come from your data source

  const handleDragStart = (e: React.DragEvent, article: string) => {
    setSelectedArticle(article);
    e.dataTransfer.setData("text/plain", article);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedArticle = e.dataTransfer.getData("text/plain");
    if (droppedArticle === correctArticle) {
      // Article is correct, keep it in place
      return;
    }
    // Article is incorrect, reset the selection
    setSelectedArticle(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-4xl mb-8 font-bold">Level {currentLevel}</h1>
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
            <span className="text-2xl">Lampe</span>
          </div>
        </div>
      </div>
    </>
  );
}
