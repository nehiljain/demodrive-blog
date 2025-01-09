"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CalendarButton, useInitCal } from "@/components/ui/calendar-popup"

const navigation = [
  { name: "Blog", href: "https://blog.demodrive.tech/" },
  { name: "Pricing", href: "https://demodrive.tech/pricing" },
]

export function Navbar() {
  useInitCal()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between p-4 px-6 rounded-full border border-fd-muted bg-fd-background/80 backdrop-blur-sm shadow-lg w-[90%] max-w-6xl">
      <Link href="https://demodrive.tech" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="h-8 w-8" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            {item.name}
          </Link>
        ))}
        <CalendarButton />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg text-fd-muted-foreground hover:text-fd-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <CalendarButton className="w-full" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
