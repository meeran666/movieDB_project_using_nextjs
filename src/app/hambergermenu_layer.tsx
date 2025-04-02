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
      className='absolute p-[0.3rem] rounded-[3%] h-[4rem] w-[8rem] top-[3rem] right-[0] bg-(--hamberger_color) z-[4]' >
      <a className="pb-[1rem] no-underline text-(--hamberger_child_color) " href={'/'}> Browse Movie </a>
      <a className='pb-[1rem] no-underline text-(--hamberger_child_color) '> About </a>
    </div>
  )
}
