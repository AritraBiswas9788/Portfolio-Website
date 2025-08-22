"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Share_Tech_Mono } from "next/font/google";

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400' });

const links = [
    { name: 'home', path: "/" },
    { name: 'about me', path: "/services" },
    { name: 'work', path: "/work" },
    { name: 'contact', path: "/contact" },
];

const Nav = () => {
    const pathName = usePathname();

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => (
    <Link
        href={link.path}
        key={index}
        className={`${shareTechMono.className} ${link.path === pathName && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all duration-300`}
    >
        {link.name}
        {link.path === pathName && ' />'}
    </Link>
))}
        </nav>
    );
};

export default Nav;