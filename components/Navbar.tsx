import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './mode-toggle'
import MobileSidebar from './MobileSidebar'

const font = Poppins({
    weight: "600",
    subsets: ["latin",]
})

const Navbar = () => {
  return (
    <div className='text-black w-full fixed z-50 flex items-center justify-between border-primary/10  pl-5 pr-5 bg-slate-200 mt-0 dark:bg-secondary dark:text-white h-16'>
        <div className='flex items-center'>
            <div className='block md:hidden text-black dark:text-slate-200'>
                <MobileSidebar />
            </div>
            <Link href={'/'}>
                <h1
                 className={cn('hidden md:block text-xl font-bold text-black md:text-3xl dark:text-slate-200',
                            font.className
                )}>
                    buddy.ai
                </h1>
            </Link>
        </div>
        <div className='flex gap-3'>
            <SignedIn>
                <Button variant={'premium'} size={'sm'}>
                    Upgrade
                    <Sparkles className='h-4 w-4 fill-white text-white ml-2' />
                </Button>
                <ModeToggle />
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
                <SignOutButton />
            </SignedOut>
        </div>
    </div>
  )
}

export default Navbar