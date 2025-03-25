'use client'
import navbar_styles from '@/styles/navbar.module.css'
import Logo from '@/public/logo.svg'
import { Ref } from 'react'
type ButtonProp = {
  onHambergerClick: () => void
  buttonref: Ref<HTMLDivElement> | undefined
}
type MobileComponentProp = ButtonProp & {
  isHambergerMenu: boolean
}
type NavbarProp = MobileComponentProp & {
  isMobile: boolean
}
function HamButton({ onHambergerClick, buttonref }: ButtonProp) {
  return (
    <div className={navbar_styles.hamberger_button} onClick={onHambergerClick} ref={buttonref}>
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
        style={{
          width: '1.5rem',
          height: '1.5rem',
          position: 'relative',
        }}>
        <div
          className={navbar_styles.cross_line}
          style={{
            transform: 'translate(-50%, -50%) rotate(45deg)',
          }}></div>
        <div
          className={navbar_styles.cross_line}
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
    <div className={navbar_styles.nav_buttons}>
      <a className={navbar_styles.browse_movie + ' ' + navbar_styles.hover_effect_cyan} href={'/'}>
        Browse movie
      </a>
      <div className={navbar_styles.about + ' ' + navbar_styles.hover_effect_cyan}>About</div>
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
      <div className={navbar_styles.navbar}>
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
