"use client";
import Photo from '../components/Photo';
import Socials from '../components/Socials';
import Stats from '../components/Stats';
import { Button } from '../components/ui/button';
import BackgroundStreaks from '../components/BackgroundStreaks';
import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { Share_Tech_Mono } from 'next/font/google';
import { Typewriter } from "react-simple-typewriter";

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400' });

const Home = () => {
  const [glitchedText, setGlitchedText] = useState('Aritra Biswas');
  const originalText = 'Aritra Biswas';
  
  // Characters that can appear during glitch
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgheijklmnopqrztuvwxyz';

  const triggerGlitch = () => {
    let currentText = '';
    let glitchCount = 0;
    const maxGlitches = 8; // Number of glitch cycles before settling
    
    const glitchInterval = setInterval(() => {
      // Generate completely random text for this cycle
      let newText = '';
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === ' ') {
          newText += ' '; // Keep spaces
        } else {
          newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      
      setGlitchedText(newText);
      glitchCount++;
      
      // After max glitches, settle back to original
      if (glitchCount >= maxGlitches) {
        clearInterval(glitchInterval);
        setGlitchedText(originalText);
      }
    }, 100); // Change every 100ms for smooth rolling effect
  };

  useEffect(() => {
    // Trigger glitch on first page load after a short delay
    const initialGlitch = setTimeout(() => {
      triggerGlitch();
    }, 1000); // 1 second delay after page loads

    const glitchInterval = setInterval(() => {
      // Random chance to trigger glitch (about every 4-9 seconds)
      if (Math.random() < 0.3) {
        triggerGlitch();
      }
    }, 4000);

    return () => {
      clearTimeout(initialGlitch);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <section className='h-full relative'>

      <div className="container-mx-auto ">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-0 xl:p-20">
          <div className='text-center xl:text-left order-2 xl:order-none'>
            <span className='text-xl'>Software Developer</span>
            <h1 className='h1 mb-6'>
              Hello I'm<br />
              <span 
                className={`text-accent ${shareTechMono.className} transition-all duration-75 font-mono`} 
                style={{ fontFamily: '"Share Tech Mono", monospace' }}
              >
                {glitchedText}
              </span>
            </h1>
            <p className='xl:max-w-[500px] mb-9 text-white/80'>
              Code is my canvas. Software is my art. <br/>
               What starts as a spark of an idea becomes design, then code, then experience.
               That’s the journey I create every day. <br/>
               <span>I make{" "}</span>
              <span className="text-green-400">
                <Typewriter
                  words={["Software","Apps", "Websites", "AI" , "Games", "UI/UX", "Designs"]}
                  loop={0} // 0 = infinite
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={70}
                  delaySpeed={1000}
                />
              </span>
            </p>
            <div className='flex flex-col xl:flex-row gap-8 items-center'>
              <Button asChild variant='outline' size='lg' className='flex uppercase items-center gap-2'>
                 <a href="/assets/resume.pdf" download>
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
                {/* <span>Download CV</span>
                <FiDownload className='text-xl' /> */}
              </Button>
              <div className='mb-8 xl:mb-0'>
                <Socials containerStyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full justify-center flex text-accent text-base items-center hover:bg-accent hover:text-primary hover:transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className='order-1 xl:order-none mb-8 xl:mb-0'>
            <Photo/>
          </div>
        </div>
      </div>
      <Stats/>
    </section>
  )
}

export default Home;