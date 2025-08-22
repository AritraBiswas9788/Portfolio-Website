"use client";

import CountUp from "react-countup";

const stats  = [
        {
            num: 3,
            text: 'Years of Dev Experience'
        },
        {
            num: 20,
            text: 'Projects Completed'
        },
        {
            num: 25,
            text: 'Technologies mastered'
        },
        {
            num: 341,
            text: 'Code Commits'
        }
]

const Stats = () => {
  return (
    <section>
        <div className="container mx-auto">
            <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:mx-w-none">
                {
                    stats.map((stat, index) => {
                        return <div 
                        className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                        key={index}>
                            <CountUp end={stat.num}
                            duration={5}
                            delay={2}
                            className="text-4xl font-extrabold xl:text-6xl"
                            />
                            <p
                            className={`${
                                stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                            } leading-snug text-white/80`}
                            >
                                {stat.text}
                            </p>
                            </div>
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Stats
