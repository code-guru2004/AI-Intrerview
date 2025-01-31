'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Header() {
    const path = usePathname();
    //console.log(path);
    
  return (
    <div className='flex p-4  items-center justify-between  bg-secondary shadow-md'>
        <Image 
        src={'/logo1.svg'}
        alt='logo'
        width={150}
        height={150}
        />

        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>
                <Link href='/dashboard'>
                    Dashboard
                </Link>
            </li>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/question' && 'text-primary font-bold'}`}>
                <Link href={'#'}>
                    Questions
                </Link>
            </li>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>
                <Link href={'#'}>
                    Upgrade
                </Link>
            </li>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/works' && 'text-primary font-bold'}`}>
                <Link href={'#'}>
                    How it works?
                </Link>
            </li>
        </ul>

        <UserButton/>
    </div>
  )
}

export default Header