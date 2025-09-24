import { Companion } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import Link from 'next/link'

interface CompanionsProps {
    data: (Companion & {
        _count: {
            messages: number,
        }
    })[]
}

const Companions = ({ data }: CompanionsProps) => {
    if (data.length === 0) {
        return (
            <div className='pt-10 flex flex-col items-center justify-center space-y-3'>
                <div className='relative w-60 h-60'>
                    <Image 
                        fill
                        style={{ filter: 'grayscale(100%) invert(70%)' }}
                        alt="Empty"
                        src="/empty.png"
                    />
                </div> 
                <p className='text-sm text-muted-foreground'>
                    No companions found
                </p>             
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4'>
            {data.map((item) => (
                <Link key={item.id} href={`/chat/${item.id}`} className='group'>
                    <Card className="flex flex-row bg-primary/10 hover:bg-primary/20 transition-all rounded-xl cursor-pointer shadow-sm">
                        {/* Image */}
                        <div className='relative w-28 h-28 flex-shrink-0 m-4'>
                            <Image
                                src={item.src}
                                fill
                                className='rounded-xl object-cover'
                                alt={item.name}
                            />
                        </div>

                        {/* Text + Footer */}
                        <div className='flex flex-col justify-between flex-1 py-4 pr-4 -ml-2'>
                            {/* -ml-2 pulls the text 0.5rem closer to the image */}
                            <CardContent className='flex flex-col space-y-1'>
                                <h3 className='text-lg font-bold text-foreground group-hover:text-primary transition-colors'>
                                    {item.name}
                                </h3>
                                <p className='text-sm text-muted-foreground line-clamp-3'>
                                    {item.description}
                                </p>
                            </CardContent>

                            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
                                <p className='lowercase'>
                                    @{item.userName}
                                </p>
                                <p className='text-xs text-muted-foreground'>
                                    Messages: {item._count.messages}
                                </p>
                            </CardFooter>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default Companions
