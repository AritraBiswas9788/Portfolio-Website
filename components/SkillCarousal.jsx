"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const icons = [
  // --- App Development ---
  { src: "/assets/skills/flutter.svg", name: "Flutter" },
  { src: "/assets/skills/kotlin.svg", name: "Kotlin" },
  { src: "/assets/skills/dart.svg", name: "Dart" },
  // { src: "/assets/skills/androidstudio.svg", name: "Android Studio" },
  { src: "/assets/skills/xml.svg", name: "XML" },
  { src: "/assets/skills/firebase-svgrepo-com.svg", name: "Firebase" },

  // --- Machine Learning / Data Science ---
  { src: "/assets/skills/python.svg", name: "Python" },
  { src: "/assets/skills/tensorflow.svg", name: "TensorFlow" },
  { src: "/assets/skills/pandas.svg", name: "Pandas" },
  { src: "/assets/skills/flask.svg", name: "Flask" },

  // --- Web Development ---
  { src: "/assets/skills/html.svg", name: "HTML5" },
  { src: "/assets/skills/css.svg", name: "CSS3" },
  { src: "/assets/skills/js.svg", name: "JavaScript" },
  { src: "/assets/skills/react.svg", name: "React" },
  { src: "/assets/skills/next.svg", name: "Next.js" },
  { src: "/assets/skills/tailwind.svg", name: "Tailwind CSS" },

  // --- Databases / Tools ---
  { src: "/assets/skills/mongodb.svg", name: "MongoDB" },
  { src: "/assets/skills/oracledb.svg", name: "Oracle DB" },
  { src: "/assets/skills/docker.svg", name: "Docker" },
  { src: "/assets/skills/figma.svg", name: "Figma" },
];


export default function SkillsCarousel() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollSpeed = 1; // px per frame
    let rafId;

    const step = () => {
      track.scrollLeft += scrollSpeed;

      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
        track.scrollLeft = 0;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex space-x-4 overflow-x-scroll overflow-hidden no-scrollbar py-10"
      >
        {[...icons, ...icons, ...icons, ...icons].map((icon, i) => (
          <div
            key={i}
            className="group relative w-24 h-24 flex-shrink-0 rounded-2xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.6)]"
          >
            <Image
              src={icon.src}
              alt={icon.name}
              width={40}
              height={40}
              className="py-2 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:brightness-150 group-hover:filter"
            />
            <span className="absolute bottom-2 opacity-0 translate-y-2 text-xs text-white/80 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ">
              {icon.name}
            </span>
          </div>
        ))}
      </div>

      {/* gradient masks */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

      {/* hide scrollbar globally */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
