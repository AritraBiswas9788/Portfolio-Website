"use client";
import React from 'react'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../components/ui/sheet"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CiMenuFries } from 'react-icons/ci'



const links = [
    {
        name: 'home',
        path: "/"
    },
    {
        name: 'services',
        path: "/services"
    },
    {
        name: 'resume',
        path: "/resume"
    },
    {
        name: 'work',
        path: "/work"
    },
    {
        name: 'contact',
        path: "/contact"
    },


]

const MobileNav = () => {
    const pathName = usePathname();

    return (
        <Sheet>
            <SheetTrigger className='flex justify-center items-center'>
                <CiMenuFries className='text-[32px] text-accent' />
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetTitle className='hidden'>
                    Lmao
                </SheetTitle>
                <div className='mt-32 mb-40 text-center text-2xl'>
                    <Link href='/'>
                        <h1 className='text-4xl font-semibold'>
                            Aritra<span className='text-accent'>.</span>
                        </h1>
                    </Link>
                </div>
                <nav className='flex flex-col gap-8 justify-center items-center'>
                    {links.map((link, index) => {
                        return <Link href={link.path} 
                        key={index} 
                        className={`text-xl capitalize font-medium hover:text-accent transition-all duration-200 ${link.path === pathName && "text-accent"}`}>
                            {link.name}
                        </Link>
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
