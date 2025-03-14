"use client";

import { Share2 } from "lucide-react";

interface FloatingShareProps {
  title: string;
  text: string;
  url: string;
}

export default function FloatingShare({ title, text, url }: FloatingShareProps) {
  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Fitur berbagi tidak didukung di browser ini.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={shareEvent}
        className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-all"
      >
        <Share2 className="size-6" />
      </button>
    </div>
  );
}
