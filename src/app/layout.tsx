'use client'
import Navbar from './navbar'
import Footer from './fotter'
import '@/styles/globals.css'
import React, { useState, useEffect, useRef } from 'react'
import HambergerMenuLayer from './hambergermenu_layer'

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isHambergerMenuOpen, setIsHambergerMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const handleHambergerButtonClick = () => {
    setIsHambergerMenuOpen(!isHambergerMenuOpen)
  }
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 780)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('inside window')
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsHambergerMenuOpen(false)
      } else {
        event.stopPropagation()
      }
    }
    if (isHambergerMenuOpen) {
      setTimeout(() => {
        window.addEventListener('click', handleClickOutside)
      }, 0)
    } else {
      window.removeEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isHambergerMenuOpen])
  return (
    <html lang="en">
      <body>
        <Navbar
          onHambergerClick={handleHambergerButtonClick}
          isHambergerMenu={isHambergerMenuOpen}
          isMobile={isMobile}
          buttonref={buttonRef}
        />
        {isHambergerMenuOpen ? (
          <HambergerMenuLayer sidebarRef={sidebarRef} isHambergerMenuOpen={isHambergerMenuOpen} />
        ) : null}
        <main style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}>{children}</main>
        {/* <SearchBox></SearchBox> */}
        <Footer />
      </body>
    </html>
  )
}
