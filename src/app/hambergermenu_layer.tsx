import navbarStyles from '@/styles/navbar.module.css'
import { RefObject } from 'react'
type HambergerMenuLayerProp = {
  sidebarRef: RefObject<HTMLDivElement> | undefined
  isHambergerMenuOpen: boolean
}
export default function HambergerMenuLayer({
  sidebarRef,
  isHambergerMenuOpen,
}: HambergerMenuLayerProp) {
  return (
    <div
      ref={sidebarRef}
      className={`${navbarStyles.hamberger_menu} ${
        isHambergerMenuOpen ? navbarStyles.hamberger_menu_open : ''
      }`}>
      <a href={'/'}> Browse Movie </a>
      <a> About </a>
    </div>
  )
}
