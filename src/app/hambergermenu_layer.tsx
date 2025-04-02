import navbarStyles from '@/styles/navbar.module.css'
import { RefObject } from 'react'
type HambergerMenuLayerProp = {
  sidebarRef: RefObject<HTMLDivElement | null>
  isHambergerMenuOpen: boolean
}
export default function HambergerMenuLayer({
  sidebarRef,
  isHambergerMenuOpen,
}: HambergerMenuLayerProp) {
  return (
    <div
      ref={sidebarRef}
      className='absolute p-0.2rem rounded-[3%] h-[4rem] w-[8rem] top-[3rem] right-[0] bg-(--hamberger_color) z-[4]' >
      <a href={'/'}> Browse Movie </a>
      <a> About </a>
    </div>
  )
}
