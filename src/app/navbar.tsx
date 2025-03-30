'use client'
import navbar_styles from '@/styles/navbar.module.css'
import Logo from '@/public/logo.svg'
import { RefObject } from 'react'
type ButtonProp = {
  onHambergerClick: () => void
  buttonref: RefObject<HTMLDivElement | null>
}
type MobileComponentProp = ButtonProp & {
  isHambergerMenu: boolean
}
type NavbarProp = MobileComponentProp & {
  isMobile: boolean
}
function HamButton({ onHambergerClick, buttonref }: ButtonProp) {
  return (
    <div className="flex flex-col gap-[3px] [&>*]:h-[6px] [&>*]:w-[20px] [&>*]:rounded-[20%] [&>*]:bg-[cyan]" onClick={onHambergerClick} ref={buttonref}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
function CrossButton({ onHambergerClick, buttonref }: ButtonProp) {
  return (
    <>
      <div
        onClick={onHambergerClick}
        ref={buttonref}
        className='w-[1.5rem] h-[1.5] relative'
        >
        <div
          className="rotate-[45] w-[1rem] h-[0.2rem]  bg-white absolute top-[50%] left-[50%] origin-center"
          style={{
            transform: 'translate(-50%, -50%) rotate(45deg)',
          }}></div>
        <div
          className="rotate-[45] w-[1rem] h-[0.2rem]  bg-white absolute top-[50%] left-[50%] origin-center"
          style={{
            transform: 'translate(-50%, -50%) rotate(-45deg)',
          }}></div>
      </div>
    </>
  )
}
function MobileComponent({ onHambergerClick, isHambergerMenu, buttonref }: MobileComponentProp) {
  return (
    <>
      {isHambergerMenu ? (
        <CrossButton onHambergerClick={onHambergerClick} buttonref={buttonref} />
      ) : (
        <HamButton onHambergerClick={onHambergerClick} buttonref={buttonref} />
      )}
    </>
  )
}
function DesktopComponent() {
  return (
    <div className="[&>*]:px-[10px] [&>*]:inline">
      <a className="no-underline text-gray-500 text-[20px] hover:text-[cyan]" href={'/'}>
        Browse movie
      </a>
      <div className="text-gray-500 text-[20px] hover:text-[cyan]">About</div>
    </div>
  )
}
export default function Navbar({
  onHambergerClick,
  isHambergerMenu,
  isMobile,
  buttonref,
}: NavbarProp) {
  
  return (
    <>
      <div className="flex items-center box-border gap-[0.3rem] pl-[4vw] pr-[3.7vw] w-[100dvw] h-[4rem] bg-[rgb(29,29,29)] border-[0.05rem] border-solid border-gray-400 [&>*]:box-border [&>*]:grow-0">
        <div className={navbar_styles.brand}>
          <Logo id={navbar_styles.logo} alt="logo" />
          <div className={navbar_styles.site_name}>Moviemania</div>
        </div>
        {isMobile ? (
          <MobileComponent
            onHambergerClick={onHambergerClick}
            isHambergerMenu={isHambergerMenu}
            buttonref={buttonref}
          />
        ) : (
          <DesktopComponent />
        )}
      </div>
    </>
  )
}
