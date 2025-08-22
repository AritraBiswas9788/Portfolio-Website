"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const achievements = [
  { title: "Contributor", detail: "Google Summer of Code 2024", sub: "Liquid Galaxy Project" },
  { title: "Rank 1", detail: "MasterStack 2.0", sub: "Srijan 2023, IIT (ISM) Dhanbad" },
  { title: "Rank 1", detail: "Winter of Code 5.0", sub: "App Development Division, CyberLabs IIT (ISM)" },
  { title: "Rank 3", detail: "Hackfest 2025", sub: "NVCTI, IIT (ISM) Dhanbad" },
  { title: "Rank 5", detail: "Hackfest 2024", sub: "NVCTI, IIT (ISM) Dhanbad" },
];

const trophyColors = {
  Contributor: "stroke-yellow-400",
  "Rank 1": "stroke-yellow-400",
  "Rank 3": "stroke-gray-300",
  "Rank 5": "stroke-amber-600",
};

export default function AchievementsShowcase({ visibleSections }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = right, -1 = left

  if (!visibleSections.includes("achievements")) return null;

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const current = achievements[currentIndex];
  const trophyColor = trophyColors[current.title] || "stroke-white";

  return (
    <div className="animate-slideUp text-center flex flex-col items-center space-y-4">
      {/* Navigation */}
      <div className="flex items-center space-x-6">
        <button onClick={prev} className="p-2 text-white hover:text-green-400">
          <ChevronLeft size={28} />
        </button>

        {/* Animate trophy sliding from side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -direction * 100, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <svg
              viewBox="0 0 496 496"
              className={`w-32 h-32 fill-none ${trophyColor}`}
              strokeWidth="5"
            >
              <path d="M267.604,350.776L338.42,67.544l-51.937,18.181c5.425-8.622,8.577-18.81,8.577-29.725c0-30.872-25.128-56-56-56
                s-56,25.128-56,56c0,24.368,15.66,45.145,37.438,52.823l-62.918,22.025l53.072,219.864c-19.16,9.52-32.382,28.129-35.075,49.288
                H159.06v96h160v-96h-16.517C299.855,378.903,286.694,360.314,267.604,350.776z M199.06,56c0-22.056,17.944-40,40-40
                c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40C217.004,96,199.06,78.056,199.06,56z M315.7,92.448l-5.516,22.065
                l-129.641,43.255l-4.01-16.616L315.7,92.448z M222.732,362.912l6.728-2.448l-45.153-187.093l121.278-40.464l-56.893,227.566
                l6.768,2.472c16.35,5.957,28.049,20.307,30.913,37.056h-94.627C194.615,383.217,206.35,368.857,222.732,362.912z M175.06,480v-32
                h96v-16h-96v-16h128v16h-16v16h16v32H175.06z" />
            </svg>
          </motion.div>
        </AnimatePresence>

        <button onClick={next} className="p-2 text-white hover:text-green-400">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Achievement text with same sliding effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 50 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h4 className="text-xl font-bold text-white">{current.title}</h4>
          <p className="text-sm text-gray-300">{current.detail}</p>
          <p className="text-xs text-gray-400 italic">{current.sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
    