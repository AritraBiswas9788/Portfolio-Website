"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import WorkSliderBtns from "../../components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "App Development",
    title: "My Vault",
    description:
      "A secure app for storing and viewing images and PDFs using Firebase cloud storage, featuring in-app viewers and cloud storage analysis with MPAndroidCharts.",
    stack: [{ name: "Android" }, { name: "Firebase" }, { name: "MPAndroidCharts" }],
    image: ["/assets/work/MyVault.png", "/assets/work/MyVault2.png"],
    live: "",
    github: "https://github.com/AritraBiswas9788/My-Vault",
  },
  {
    num: "02",
    category: "App Development | Machine Learning",
    title: "Recyclr",
    description:
      "Intelligent waste management solution that detects, classifies, and schedules waste for pickup using a TFlite Object Detection model, reducing hassle by over 50%.",
    stack: [{ name: "Android" }, { name: "TFLite" }, { name: "Firebase" }],
    image: ["/assets/work/Recyclr.png","/assets/work/Recyclr2.png"],
    live: "",
    github: "https://github.com/AritraBiswas9788/Recyclr",
  },
  {
    num: "03",
    category: "App Development | Machine Learning",
    title: "AquaSense",
    description:
      "A platform to share and resolve India’s water-related problems, with intelligent detection and dynamic visualization of hotspots using TFLite and Mapbox SDK.",
    stack: [
      { name: "Kotlin" },
      { name: "XML" },
      { name: "Firebase" },
      { name: "TensorFlowLite" },
      { name: "Mapbox SDK" },
      { name: "Lottie Animations" },
    ],
    image: ["/assets/work/Aquasense.png", "/assets/work/aquasense2.png"],
    live: "",
    github: "https://github.com/AritraBiswas9788/AquasenseRepo",
  },
  {
    num: "04",
    category: "App Development | Machine Learning | AR",
    title: "RakShak",
    description:
      "Accident safety app with automatic alerts and AR-based First Aid guidance, using smartphone sensors to monitor real-time motion changes and detect injuries.",
    stack: [
      { name: "Kotlin" },
      { name: "XML" },
      { name: "Firebase" },
      { name: "TensorFlowLite" },
      { name: "Google MediaPipe" },
      { name: "Mapbox SDK" },
    ],
    image: ["/assets/work/rakshak.png","/assets/work/rakshak2.png","/assets/work/rakshak3.png"],
    live: "",
    github: "https://github.com/AritraBiswas9788/RakShak-Safety_App",
  },
  {
    num: "05",
    category: "App Development | Geo-Data Visualization",
    title: "Super Liquid Galaxy Controller ",
    description:
      "De-facto Liquid Galaxy Controller combining previous controllers, with Smart POI, interactive tours, and accessibility-friendly controls via Face Detection, Hand Gestures, and Voice Commands.",
    stack: [
      { name: "Flutter" },
      { name: "SSH" },
      { name: "KMLs" },
      { name: "UI/UX" },
      { name: "Geo-Data Visualization" },
    ],
    image: [
      "/assets/work/SLGC.png",
      "/assets/work/slgc2.png",
      "/assets/work/slgc3.png",
      "/assets/work/slgc4.png",
    ],
    live: "",
    github: "https://github.com/LiquidGalaxyLAB/Super-Liquid-Galaxy-Controller",
  },
  {
    num: "06",
    category: "App Development | Machine Learning | UI/UX",
    title: "Fantasy Team Generator - Dream11",
    description:
      "Dream11 replica with AI-driven fantasy team generation, player predictions, insights, and data-driven decision-making for optimal team selection.",
    stack: [
      { name: "Flutter" },
      { name: "Figma" },
      { name: "TensorFlowLite" },
      { name: "Python" },
      { name: "Flask API" },
    ],
    image: [
      "/assets/work/dream11.png",
      "/assets/work/dream2.png",
      "/assets/work/dream3.png",
    ],
    live: "",
    github: "https://github.com/AritraBiswas9788/InterIIT_Dream11",
  },
  {
    num: "07",
    category: "App Development | Machine Learning | UI/UX",
    title: "Sentinova",
    description:
      "The attendee app enhances events by enabling real-time issue reporting, community engagement, and sentiment sharing. AI-driven analysis and alerts ensure quick responses for a seamless, interactive experience.",
    stack: [
      { name: "Flutter" },
      { name: "MongoDB" },
      { name: "TFLite" },
      { name: "Flask API" },
      { name: "NextJS" },
      { name: "TailwindCSS" },
    ],
    image: ["/assets/work/sentinova.png", "/assets/work/sentinova2.png"],
    live: "",
    github: "https://github.com/AritraBiswas9788/Sentinova_Hackfest25",
  },
];


const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const swiperRefs = useRef([]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
    if (swiperRefs.current[currentIndex]) {
      swiperRefs.current[currentIndex].slideTo(0); // reset to first image
      if (swiperRefs.current[currentIndex].autoplay) {
        swiperRefs.current[currentIndex].stop();   // stop any running cycle
        swiperRefs.current[currentIndex].start();  // restart timer from zero
      }
      // swiperRefs.current[currentIndex].autoplay.start(); // restart autoplay fresh
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, delay: 1.5, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* Left Side - Project Info */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[20px] h-[50%]">
              <div className="text-6xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>


              
                <h2 className="text-[22px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title}
                </h2>
                <p className="font-extralight leading-none text-accent group-hover:text-accent transition-all duration-500 capitalize">
                {project.category}
                </p>
            
              

              

              <p className="text-white/60">{project.description}</p>

              {/* Tech Stack */}
              <ul className="flex flex-col gap-2">
                {project.stack
                  .reduce((rows, item, index) => {
                    if (index % 4 === 0) rows.push([]);
                    rows[rows.length - 1].push(item);
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <li
                      key={rowIndex}
                      className="flex gap-2 text-lg text-accent"
                    >
                      {row.map((item, idx) => (
                        <span key={idx}>
                          {item.name}
                          {idx !== row.length - 1 && " • "}
                        </span>
                      ))}
                    </li>
                  ))}
              </ul>

              <div className="border border-white/20"></div>

              {/* GitHub Link */}
              <div>
                <Link
                  href={project.github}
                  target="_blank"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-500 mt-4"
                >
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-3xl text-white group-hover:text-accent " />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Project Images */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[420px] mb-12 relative"
              allowTouchMove={false} // disable manual swiping
              onSlideChange={handleSlideChange}
            >
              {projects.map((proj, index) => (
                <SwiperSlide
                  key={index}
                  className="w-full"
                  onClick={() => setProject(proj)}
                >
                  <div className="aspect-[4/3] relative flex justify-center items-center bg-pink-50/20 rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105">
                    {/* Inner Swiper for images */}
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      spaceBetween={0}
                      slidesPerView={1}
                      onSwiper={(swiper) => (swiperRefs.current[index] = swiper)}
                      pagination={{
                        clickable: true,
                        bulletClass: "swiper-pagination-bullet !bg-green-500",
                        bulletActiveClass:
                          "swiper-pagination-bullet-active !bg-green-600",
                      }}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      loop={true}
                      className="w-full h-full"
                    >
                      {proj.image.map((img, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                          <div className="relative w-full h-full">
                            <Image
                              src={img}
                              fill
                              alt={`${proj.title}-${imgIndex}`}
                              className="object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation Buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_10px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
