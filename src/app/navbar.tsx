'use client'
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
    <div className="flex flex-col gap-[3px] " onClick={onHambergerClick} ref={buttonref}>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
      <div className="h-[6px] w-[20px] rounded-[20%] bg-[cyan]"></div>
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
    <div className="grow-0 ">
      <a  className="px-[10px] inline hover:text-[cyan] text-gray-500 text-[20px]"href={'/'}>
        Browse movie
      </a>
      <a className='px-[10px] inline hover:text-[cyan] text-gray-500 text-[20px]' href={'/about'} >
        About
      </a>
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
      <div className="max-[780px]:h-[3rem] max-[780px]:pl-15px flex items-center gap-[0.3rem] pl-[4vw] pr-[3.7vw] w-[100dvw] h-[4rem] bg-(--black_color) border-[0.05rem] border-solid border-(--gray_color)">
        <div className="flex items-center gap-[0.4rem] grow">
          <Logo className='max-[780px]:h-[1.6rem] max-[780px]:w-auto w-auto h-[2.1rem]' alt="logo" />
          <div className="max-[780px]:text-[1.7rem] text-[35px] text-(--voilet_color)">Moviemania</div>
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
