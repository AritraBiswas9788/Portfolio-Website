"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SkillsCarousel from "../../components/SkillCarousal";
import { Orbitron } from "next/font/google";
import AchievementsShowcase from "../../components/AchievementsShowcase";
import { motion } from "framer-motion";
const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] });
const achievements = [
  { title: "Contributor", detail: "Google Summer of Code 2024", sub: "Liquid Galaxy Project", }, { title: "Rank 1", detail: "MasterStack 2.0", sub: "Srijan 2023, IIT (ISM) Dhanbad", }, { title: "Rank 1", detail: "Winter of Code 5.0", sub: "App Development Division, CyberLabs IIT (ISM)", }, { title: "Rank 3", detail: "Hackfest 2025", sub: "NVCTI, IIT (ISM) Dhanbad", }, { title: "Rank 5", detail: "Hackfest 2024", sub: "NVCTI, IIT (ISM) Dhanbad", },
]
const codeString = `class AritraBiswas {
  // I can, because I did.
  // I never stopped learning.

  constructor() {
    this.name = 'Aritra Biswas'
    this.birthdate = '30-04-2004'
    this.age = 21
    this.email = 'aritrabiswas9788@gmail.com'
    this.phone = '+91-8777692898'
    this.linkedin = 'https://www.linkedin.com/in/aritra-biswas-398b95250'
    this.github = 'https://github.com/AritraBiswas9788'
  }

  education() {
    return [
      { '2021-2026': 'IIT (ISM) Dhanbad - B.Tech, Electronics & Communication Engineering, GPA: 7.94' },
      { '2009-2022': 'Don Bosco School, Liluah - ISC 97.25%, ICSE 95.60%' }
    ]
  }

  workExperience() {
    return [
      { 'May-Jul 2025': 'Software Development Intern at BNY Mellon, Pune' },
      { 'May-Aug 2024': 'Google Summer of Code Developer at Liquid Galaxy Org' }
    ]
  }

  projects() {
    return [
      { 'Sentinova (Apr 2025)': 'AI-powered feedback analysis system' },
      { 'Rakshak (May 2024)': 'Accident safety app with crash detection' },
      { 'Recyclr (Oct 2023)': 'Waste management app with auto-detection' }
    ]
  }

  technicalSkills() {
    return {
      languages: ['C', 'C++', 'Java', 'Python', 'Kotlin', 'Dart', 'JavaScript', 'HTML', 'CSS', 'SQL',],
      technologies: ['Flutter', 'Firebase', 'TFLite', 'Mapbox SDK', 'Flask','TensorFlow', 'Next.js', 'MongoDB'],
      tools: ['VS Code', 'Android Studio', 'GitHub', 'Postman','Docker', 'Figma',]
    }
  }

  achievements() {
    return [
      'Google Summer of Code 2024 Contributor',
      'Rank 1: MasterStack 2.0, IIT(ISM) Dhanbad',
      'Rank 1: Winter of Code 5.0',
      'Rank 3: Hackfest 2025, IIT(ISM) Dhanbad'
    ]
  }

  positionsOfResponsibility() {
    return [
      'Secretary: Mic.Drop ToastMasters',
      'Co-Division Head: CyberLabs (App Dev Division)'
    ]
  }
}`;

const highlightSyntax = (line) => {
  const indent = line.match(/^(\s*)/)?.[1] || "";
  const content = line.slice(indent.length);
  const regex =
    /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\/\/.*$)|\b(\d+)\b|\b(class|constructor|return|this|const|let|var|function|if|else|for|while|new)\b/g;

  let result = "";
  let lastIndex = 0;

  content.replace(regex, (match, strLit, comment, number, keyword, offset) => {
    result += content.slice(lastIndex, offset);

    if (strLit) result += `<span class="text-orange-400">${strLit}</span>`;
    else if (comment) result += `<span class="text-green-500 italic">${comment}</span>`;
    else if (number) result += `<span class="text-cyan-400">${number}</span>`;
    else if (keyword) result += `<span class="text-blue-400 font-semibold">${keyword}</span>`;

    lastIndex = offset + match.length;
    return match;
  });

  result += content.slice(lastIndex);
  return indent + result;
};

export default function Page() {
  const [executing, setExecuting] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [showEmulator, setShowEmulator] = useState(false);

  const codeContainerRef = useRef(null);
  const emulatorContentRef = useRef(null);
  const lineRefs = useRef([]);

  const runCode = async () => {
    setExecuting(true);
    setCurrentLine(0);
    setVisibleSections([]);
    setShowEmulator(true);

    const lines = codeString.split("\n");

    for (let i = 0; i < lines.length; i++) {
      setCurrentLine(i);

      if (lines[i].includes("constructor")) setVisibleSections((prev) => [...new Set([...prev, "about"])]);
      if (lines[i].includes("education")) setVisibleSections((prev) => [...new Set([...prev, "education"])]);
      if (lines[i].includes("workExperience")) setVisibleSections((prev) => [...new Set([...prev, "work"])]);
      if (lines[i].includes("projects")) setVisibleSections((prev) => [...new Set([...prev, "projects"])]);
      if (lines[i].includes("technicalSkills")) setVisibleSections((prev) => [...new Set([...prev, "skills"])]);
      if (lines[i].includes("achievements")) setVisibleSections((prev) => [...new Set([...prev, "achievements"])]);
      if (lines[i].includes("positionsOfResponsibility")) setVisibleSections((prev) => [...new Set([...prev, "responsibility"])]);

      // Auto scroll to current line
      if (lineRefs.current[i]) {
        lineRefs.current[i].scrollIntoView({ behavior: "smooth", block: "center" });
      }

      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    setExecuting(false);
  };

  useEffect(() => {
    if (emulatorContentRef.current) {
      emulatorContentRef.current.scrollTo({
        top: emulatorContentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleSections]);

  return (
    <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.4, delay: 1.5, ease: "easeIn" } }}>
    <div className="flex h-[calc(100vh-10rem)] gap-6 px-10 py-7">
      {/* Left IDE */}
      <div className="flex-1 rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1e] flex flex-col shadow-[0_0_50px_rgba(34,197,94,0.15)]">
        <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2 text-sm flex-shrink-0">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="text-gray-400 text-xs">About.tsx</span>
          <button
            onClick={runCode}
            disabled={executing}
            className="bg-[#2d2d2d] relative overflow-hidden text-gray-200 px-3 py-1 rounded hover:bg-[#3a3a3a] hover:text-green-400 transition disabled:opacity-50"
          >
            ▶ Run
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
              initial={{ x: "0%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </button>
        </div>

        <div ref={codeContainerRef} className="p-1 flex-1 overflow-y-auto ide-scrollbar">
          <div className="p-6 font-mono text-sm ">
            {codeString.split("\n").map((line, index) => (
            <div
              key={index}
              ref={(el) => (lineRefs.current[index] = el)}
              className={`
                group flex items-start transition-all duration-200 ease-in-out pl-6 -ml-6 py-1
                border-l-4
                ${currentLine === index 
                  ? "bg-[#2d2d2d] border-l-[#22c55e]" 
                  : "border-l-transparent hover:bg-[#2d2d2d] hover:border-l-[#58a6ff]"}
              `}
            >
              <span className="text-gray-500 text-sm mr-4 select-none min-w-[2rem] text-right">
                {index + 1}
              </span>
              <div
                className="text-gray-300 flex-1 whitespace-pre"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
              />
            </div>
          ))}

          </div>
        </div>
      </div>

      {/* Right Emulator (phone style) */}
      {showEmulator && (
        <div className="relative w-[320px] bg-black rounded-[2rem] border-4 border-gray-700 shadow-[0_0_50px_rgba(34,197,94,0.25)] overflow-hidden flex flex-col">
          {/* Phone notch + close */}
          <div className="flex justify-between items-center bg-[#111] px-4 py-2 text-gray-400 text-xs">
            <div className="w-20 h-3 bg-gray-800 rounded-full mx-auto"></div>
            <button onClick={() => setShowEmulator(false)} className="text-red-400 hover:text-red-500 font-bold">x</button>
          </div>
          <div 
          ref={emulatorContentRef}
          className="flex-1 p-5 space-y-6 overflow-y-auto">
            {visibleSections.includes("about") && (
              <div className="text-center animate-fadeIn mix-blend-lighten">
              {/* Squiggly circle SVG */}
              <svg
                width={180}
                height={180}
                viewBox="0 0 180 180"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <path
                  d="
                    M90,20
                    Q110,30 120,60
                    Q130,90 160,90
                    Q130,100 120,130
                    Q110,160 90,160
                    Q70,160 60,130
                    Q50,100 20,90
                    Q50,90 60,60
                    Q70,30 90,20
                    Z
                    M90,40
                    Q105,50 115,70
                    Q125,90 145,90
                    Q125,100 115,120
                    Q105,140 90,140
                    Q75,140 65,120
                    Q55,100 35,90
                    Q55,90 65,70
                    Q75,50 90,40
                    Z
                  "
                  stroke="#00ff99"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                />
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
              </svg>
              
                {/* SVG mask definition */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute", width: 130, height: 170 }}
              >
                <defs>
                  <radialGradient id="fadeRadial" cx="35%" cy="45%" r="50%">
                    <stop offset="50%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                  </radialGradient>
                  <mask id="radialMask">
                    <rect width="100%" height="100%" fill="url(#fadeRadial)" />
                  </mask>
                </defs>
              </svg>
              <Image
                src="/assets/photo.png"
                alt="Aritra"
                width={100}
                height={100}
                className="rounded-full mx-auto mb-3"
                style={{
                  mask: "url(#radialMask)",
                  WebkitMask: "url(#radialMask)",
                }}
              />
                <h2 className={`text-lg font-semibold tracking-widest ${orbitron.className}`}>
                    <span className='text-accent'>&lt;</span>Aritra Biswas<span className='text-accent'>/&gt;</span>
                </h2>
                <p className={`text-gray-400 text-xs ${orbitron.className}`}>Software Developer</p>
              </div>
            )}
            {visibleSections.includes("education") && (
            <div className="animate-slideUp">
              <h3 className="font-mono text-green-400 mb-6 text-sm font-semibold">
                Education
              </h3>

              <div className="relative">
                {/* Vertical line (start below the cap, clean pixel width) */}
                <div className="absolute left-6 top-10 bottom-0 w-px bg-green-700/90" />

                {/* Graduation cap icon */}
                <div className="absolute left-6 -translate-x-1/2 top-0 z-10">
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4L30 10L16 16L2 10L16 4Z" fill="#22c55e"/>
                    <path d="M16 16V24" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 13V19C8 21.2 11.58 23 16 23C20.42 23 24 21.2 24 19V13" stroke="#22c55e" strokeWidth="2"/>
                  </svg>
                </div>

                {/* Timeline items */}
                <div className="mt-6 grid grid-cols-[48px_1fr] gap-x-4">

                  {/* ITEM 1 */}
                  <div className="relative">
                    <span className="absolute left-6 -translate-x-1/2 top-7 w-2.5 h-2.5 rounded-full bg-green-400 border border-green-700 shadow-[0_0_6px_#22c55e]" />
                  </div>
                  <div className="pb-6 group transition">
                    <div className="text-[11px] text-gray-400 font-mono tracking-wide mb-0.5">
                      2022–2026
                    </div>
                    <div className="text-gray-200 text-sm font-bold group-hover:text-green-300 transition">
                      IIT (ISM) Dhanbad
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      B.Tech, ECE &middot; GPA: 7.94
                    </div>
                  </div>

                  {/* ITEM 2 */}
                  <div className="relative">
                    <span className="absolute left-6 -translate-x-1/2 top-7 w-2.5 h-2.5 rounded-full bg-green-400 border border-green-700 shadow-[0_0_6px_#22c55e]" />
                  </div>
                  <div className="pb-2 group transition">
                    <div className="text-[11px] text-gray-400 font-mono tracking-wide mb-0.5">
                      2009–2022
                    </div>
                    <div className="text-gray-200 text-sm font-bold group-hover:text-green-300 transition">
                      Don Bosco School, Liluah
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      ISC 97.25% · ICSE 95.60%
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

            {visibleSections.includes("work") && (
            <div className="animate-slideUp">
              <h3 className="font-mono text-green-400 mb-6 text-sm font-semibold flex items-center gap-2">
                <span className="text-xl"></span>
                Work Experience
              </h3>
              <div className="grid gap-5">
                {/* Card 1 */}
                <div className="relative group bg-[#181f1b] border border-green-700/40 rounded-xl p-5 shadow-[0_0_20px_rgba(34,197,94,0.10)] transition-all duration-300 ease-out
                  hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] hover:border-green-400/80
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/10 before:to-transparent before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100
                  animate-fadeIn"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="7" width="18" height="13" rx="3" fill="#22c55e" />
                      <rect x="7" y="3" width="10" height="4" rx="2" fill="#22c55e" />
                    </svg>
                    <span className="font-mono text-green-300 text-xs tracking-wide">May–Jul 2025</span>
                  </div>
                  <div className="font-bold text-gray-100 text-base group-hover:text-green-300 transition">
                    BNY Mellon
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">Software Development Intern, Pune</div>

                  {/* Animated Tooltip Strip */}
                  <div className="pointer-events-none absolute inset-0 h-full w-full flex items-center justify-center z-20">
                    <div className="opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-400 ease-out
                      bg-[#101613] border-l-4 border-green-400 shadow-lg rounded-r-xl px-6 py-5 min-w-[220px] max-w-xs
                      flex flex-col gap-2"
                      style={{ transitionProperty: "opacity, transform" }}
                    >
                      <div className="font-mono text-green-300 text-xs mb-2">Key Points</div>
                      <ul className="list-disc pl-4 text-xs text-gray-200 space-y-1">
                        <li>Replaced iWay DQS with in-house Python system</li>
                        <li>Cut pipeline time by 90% (720s → 71s)</li>
                        <li>Enhanced data quality pipeline for scale & cost</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative group bg-[#181f1b] border border-green-700/40 rounded-xl p-5 shadow-[0_0_20px_rgba(34,197,94,0.10)] transition-all duration-300 ease-out
                  hover:shadow-[0_0_40px_rgba(34,197,94,0.25)] hover:border-green-400/80
                  before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-400/10 before:to-transparent before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100
                  animate-fadeIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#22c55e" />
                      <rect x="8" y="8" width="8" height="8" rx="2" fill="#181f1b" />
                    </svg>
                    <span className="font-mono text-green-300 text-xs tracking-wide">May–Aug 2024</span>
                  </div>
                  <div className="font-bold text-gray-100 text-base group-hover:text-green-300 transition">
                    Google Summer of Code
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">Developer, Liquid Galaxy Org</div>

                  {/* Animated Tooltip Strip */}
                  <div className="pointer-events-none absolute inset-0 h-full w-full flex items-center justify-center z-20">
                    <div className="opacity-0 group-hover:opacity-100 transform -translate-x-10 group-hover:translate-x-0 transition-all duration-400 ease-out
                      bg-[#101613] border-l-4 border-green-400 shadow-lg rounded-r-xl px-6 py-5 min-w-[220px] max-w-xs
                      flex flex-col gap-2"
                      style={{ transitionProperty: "opacity, transform" }}
                    >
                      <div className="font-mono text-green-300 text-xs mb-2">Key Points</div>
                      <ul className="list-disc pl-4 text-xs text-gray-200 space-y-1">
                        <li>Merged & upgraded 3 legacy controllers</li>
                        <li>Built Smart POI & Interactive Tours</li>
                        <li>Added face, hand and voice controllers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
           {visibleSections.includes("projects") && (
              <div className="animate-slideUp">
                <h3 className="font-mono text-green-400 mb-6 text-sm font-semibold flex items-center gap-2">
                  <span className="text-xl">🛠</span>
                  Projects
                </h3>
                <div className="grid gap-7">
                  {/* Sentinova */}
                  <div className="relative bg-gradient-to-br from-[#1e293b] via-[#181f1b] to-[#101613] border-2 border-blue-500/40 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.10)] p-6 flex flex-col items-center group overflow-visible transition-all duration-300
                    hover:scale-[1.03] hover:brightness-110"
                  >
                    {/* Diagonal Accent Bar */}
                    <div className="absolute left-0 top-0 w-20 h-20 bg-blue-500/20 rounded-tr-3xl -rotate-12 z-10 pointer-events-none" />
                    {/* AI Chip Icon */}
                    <div className="mb-3 z-20">
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <rect x="7" y="7" width="24" height="24" rx="6" fill="#3b82f6" filter="url(#glow)" />
                        <rect x="13" y="13" width="12" height="12" rx="3" fill="#181f1b" />
                        <rect x="17" y="17" width="4" height="4" rx="1" fill="#3b82f6" />
                        <defs>
                          <filter id="glow" x="-10" y="-10" width="58" height="58">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div className="font-bold text-blue-300 text-lg tracking-wide mb-1 group-hover:text-blue-400 transition z-20">
                      Sentinova
                    </div>
                    <div className="font-mono text-xs text-blue-400 mb-2 z-20">Apr 2025</div>
                    <div className="text-xs text-gray-300 text-center mb-2 z-20">AI-powered feedback analysis system</div>
                    {/* Animated bottom strip */}
                    <div className="absolute left-0 bottom-0 w-full z-30 pointer-events-none">
                      <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out
                        bg-blue-900/90 border-t-2 border-blue-400 px-6 py-3 rounded-b-2xl shadow-lg flex flex-col gap-1 overflow-hidden w-full"
                        style={{ transitionProperty: "opacity, transform" }}
                      >
                        <div className="font-mono text-blue-300 text-xs mb-1">Highlights</div>
                        <ul className="list-disc pl-4 text-xs text-blue-100 space-y-1">
                          <li>AI models for feedback analysis</li>
                          <li>Real-time sentiment detection</li>
                          <li>Automated actionable insights</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Rakshak */}
                  <div className="relative bg-gradient-to-br from-[#1e293b] via-[#181f1b] to-[#101613] border-2 border-green-500/40 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.10)] p-6 flex flex-col items-center group overflow-visible transition-all duration-300
                    hover:scale-[1.03] hover:brightness-110"
                  >
                    {/* Diagonal Accent Bar */}
                    <div className="absolute left-0 top-0 w-20 h-20 bg-green-500/20 rounded-tr-3xl -rotate-12 z-10 pointer-events-none" />
                    {/* Shield Icon */}
                    <div className="mb-3 z-20">
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <path d="M19 6L31 11V19c0 7-5.5 11-12 11S7 26 7 19V11L19 6Z" fill="#22c55e" stroke="#181f1b" strokeWidth="2"/>
                        <path d="M19 6V30" stroke="#181f1b" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="font-bold text-green-300 text-lg tracking-wide mb-1 group-hover:text-green-400 transition z-20">
                      Rakshak
                    </div>
                    <div className="font-mono text-xs text-green-400 mb-2 z-20">May 2024</div>
                    <div className="text-xs text-gray-300 text-center mb-2 z-20">Accident safety app with crash detection</div>
                    {/* Animated bottom strip */}
                    <div className="absolute left-0 bottom-0 w-full z-30 pointer-events-none">
                      <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out
                        bg-green-900/90 border-t-2 border-green-400 px-6 py-3 rounded-b-2xl shadow-lg flex flex-col gap-1 overflow-hidden w-full"
                        style={{ transitionProperty: "opacity, transform" }}
                      >
                        <div className="font-mono text-green-300 text-xs mb-1">Highlights</div>
                        <ul className="list-disc pl-4 text-xs text-green-100 space-y-1">
                          <li>Crash detection via sensors</li>
                          <li>Instant emergency alerts</li>
                          <li>Location tracking & reporting</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Recyclr */}
                  <div className="relative bg-gradient-to-br from-[#1e293b] via-[#181f1b] to-[#101613] border-2 border-yellow-500/40 rounded-2xl shadow-[0_0_30px_rgba(253,224,71,0.10)] p-6 flex flex-col items-center group overflow-visible transition-all duration-300
                    hover:scale-[1.03] hover:brightness-110"
                  >
                    {/* Diagonal Accent Bar */}
                    <div className="absolute left-0 top-0 w-20 h-20 bg-yellow-500/20 rounded-tr-3xl -rotate-12 z-10 pointer-events-none" />
                    {/* Bin Icon */}
                    <div className="mb-3 z-20">
                      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <rect x="12" y="14" width="14" height="12" rx="3" fill="#fde047" stroke="#181f1b" strokeWidth="2"/>
                        <rect x="16" y="10" width="6" height="4" rx="2" fill="#fde047" stroke="#181f1b" strokeWidth="2"/>
                        <rect x="15" y="18" width="2" height="6" rx="1" fill="#181f1b"/>
                        <rect x="21" y="18" width="2" height="6" rx="1" fill="#181f1b"/>
                      </svg>
                    </div>
                    <div className="font-bold text-yellow-300 text-lg tracking-wide mb-1 group-hover:text-yellow-400 transition z-20">
                      Recyclr
                    </div>
                    <div className="font-mono text-xs text-yellow-400 mb-2 z-20">Oct 2023</div>
                    <div className="text-xs text-gray-300 text-center mb-2 z-20">Waste management app with auto-detection</div>
                    {/* Animated bottom strip */}
                    <div className="absolute left-0 bottom-0 w-full z-30 pointer-events-none">
                      <div className="translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out
                        bg-yellow-900/90 border-t-2 border-yellow-400 px-6 py-3 rounded-b-2xl shadow-lg flex flex-col gap-1 overflow-hidden w-full"
                        style={{ transitionProperty: "opacity, transform" }}
                      >
                        <div className="font-mono text-yellow-300 text-xs mb-1">Highlights</div>
                        <ul className="list-disc pl-4 text-xs text-yellow-100 space-y-1">
                          <li>Auto-detects waste type via camera</li>
                          <li>Smart disposal recommendations</li>
                          <li>Gamified user rewards</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {visibleSections.includes("skills") && (
            <div className="animate-slideUp">
              <h3 className="text-green-400 mb-2 font-semibold">⚡ Skills</h3>
              <SkillsCarousel />
            </div>
          )}
            {visibleSections.includes("achievements") && (
  <div className="animate-slideUp text-center">
    <h3 className="text-green-400 mb-4 font-semibold">Achievements</h3>

    
    <AchievementsShowcase visibleSections={visibleSections}/>
  </div>
)}

            {visibleSections.includes("responsibility") && (
  <div className="animate-slideUp text-center mt-6">
    <h3 className="text-green-400 mb-6 font-semibold">Positions of Responsibility</h3>

    <div className="flex justify-center gap-12">
      {/* Badge 1 */}
      <div className="flex flex-col items-center">
        {/* Medal SVG */}
        <svg
          className="w-10 h-10 text-yellow-400 mb-2"
          viewBox="0 0 496 496"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M314.912,224.6l103.008-44.144L357.768,0H138.232L78.08,180.456L181.088,224.6C135.312,248.736,104,296.752,104,352
            c0,79.4,64.6,144,144,144s144-64.6,144-144C392,296.752,360.688,248.736,314.912,224.6z M346.232,16l51.848,155.544l-25,10.712
            L315.248,16H346.232z M210.432,16l48.432,130.776l15.008-5.552L227.496,16h70.816l60.024,172.576l-57.76,24.752l-20.784-56.112
            l-15.008,5.552l18.432,49.76c-9.48-2.4-19.312-3.84-29.424-4.248L187.232,16H210.432z M236.96,208.56
            c-8.488,0.648-16.736,2.064-24.752,4.128l12.848-38.536L236.96,208.56z M97.92,171.544L149.768,16h20.536l5.376,15.544
            l-52.752,150.728L97.92,171.544z M137.672,188.584l46.44-132.688l32.408,93.608l-0.104-0.04l-21.248,63.752L137.672,188.584z
            M248,480c-70.576,0-128-57.424-128-128s57.424-128,128-128s128,57.424,128,128S318.576,480,248,480z"/>
          <path d="M248,256c-52.936,0-96,43.064-96,96c0,52.936,43.064,96,96,96c52.936,0,96-43.064,96-96C344,299.064,300.936,256,248,256
            z M248,432c-44.112,0-80-35.888-80-80s35.888-80,80-80s80,35.888,80,80S292.112,432,248,432z"/>
        </svg>

        {/* Position */}
        <span className="text-white font-semibold text-sm">Secretary</span>
        <span className="text-gray-300 text-xs">Mic.Drop ToastMasters</span>
      </div>

      {/* Badge 2 */}
      <div className="flex flex-col items-center">
        <svg
          className="w-10 h-10 text-blue-400 mb-2"
          viewBox="0 0 496 496"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M314.912,224.6l103.008-44.144L357.768,0H138.232L78.08,180.456L181.088,224.6C135.312,248.736,104,296.752,104,352
            c0,79.4,64.6,144,144,144s144-64.6,144-144C392,296.752,360.688,248.736,314.912,224.6z M346.232,16l51.848,155.544l-25,10.712
            L315.248,16H346.232z M210.432,16l48.432,130.776l15.008-5.552L227.496,16h70.816l60.024,172.576l-57.76,24.752l-20.784-56.112
            l-15.008,5.552l18.432,49.76c-9.48-2.4-19.312-3.84-29.424-4.248L187.232,16H210.432z M236.96,208.56
            c-8.488,0.648-16.736,2.064-24.752,4.128l12.848-38.536L236.96,208.56z M97.92,171.544L149.768,16h20.536l5.376,15.544
            l-52.752,150.728L97.92,171.544z M137.672,188.584l46.44-132.688l32.408,93.608l-0.104-0.04l-21.248,63.752L137.672,188.584z
            M248,480c-70.576,0-128-57.424-128-128s57.424-128,128-128s128,57.424,128,128S318.576,480,248,480z"/>
          <path d="M248,256c-52.936,0-96,43.064-96,96c0,52.936,43.064,96,96,96c52.936,0,96-43.064,96-96C344,299.064,300.936,256,248,256
            z M248,432c-44.112,0-80-35.888-80-80s35.888-80,80-80s80,35.888,80,80S292.112,432,248,432z"/>
        </svg>

        <span className="text-white font-semibold text-sm">Division Head</span>
        <span className="text-gray-300 text-xs">CyberLabs</span>
      </div>
    </div>
  </div>
)}



          </div>
        </div>
      )}
    </div>
    </motion.section>
  );
}
