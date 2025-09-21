import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

const MobileSidebar = () => {
  return (
    <>
    <Sheet>
        <SheetTrigger>
            <Menu className='text-slate-300'/>
        </SheetTrigger>
        <SheetContent side='left' className='p-0 bg-secondary pt-10 w-22'>
            <Sidebar />
        </SheetContent>
    </Sheet>
    </>
  )
}

export default MobileSidebar