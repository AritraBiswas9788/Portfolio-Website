import Link from 'next/link';
import { Button } from '../components/ui/button';
import React from 'react';
import { Orbitron } from "next/font/google";
const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] });

//components

import Nav from './Nav';
import MobileNav from '../components/ui/MobileNav';

const Header = () => {
    return (
        <header className='py-8 xl:py-12 text-white'>
            <div className="container mx-auto flex justify-between items-center">
                <Link href='/'>
                <h1 className={`text-4xl font-semibold tracking-widest ${orbitron.className}`}>
                    <span className='text-accent'>&lt;</span>Aritra<span className='text-accent'>/&gt;</span>
                </h1>
                </Link>


                <div className="hidden xl:flex items-center gap-8">

                <Nav/>
                <Link href='/contact'>
                <Button>Hire me</Button>
                </Link>
                </div>

                <div className="xl:hidden">
                    <MobileNav/>
                    </div>

            </div>
        </header>
    );
};

export default Header;
