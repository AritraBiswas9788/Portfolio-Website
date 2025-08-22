"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
    return (
        <div className="h-full w-full relative">
                    <svg
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
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

                    {/* Image with Radial Mask */}
                    <Image
                        src="/assets/photo1.png"
                        priority-quality={100}
                        fill
                        alt=""
                        className="object-contain"
                        style={{
                            mask: "url(#radialMask)",
                            WebkitMask: "url(#radialMask)",
                        }}
                    />
        </div>
    )
}

export default Photo
