'use client'

import { FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Usuarios',
      href: '/users',
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      name: 'Publicaciones',
      href: '/posts',
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            JSONPlaceholder Explorer
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex gap-2">
              {navItems.map(item => (
                <Button
                  key={item.href}
                  variant={
                    pathname?.startsWith(item.href) ? 'default' : 'ghost'
                  }
                  asChild
                >
                  <Link href={item.href}>
                    <span className="flex items-center">
                      {item.icon}
                      {item.name}
                    </span>
                  </Link>
                </Button>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
