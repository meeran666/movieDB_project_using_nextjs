'use client'
import list_styles from '@/styles/searchlist.module.css'
import { useState, useEffect } from 'react'
import { MovieListType } from './api/types'
type Component = {
  index: number
  date: string
  title: string | null
  id: number
  isMobile: boolean
}
function Component({ index, date, title, id, isMobile }: Component) {
  return (
    <a className="h-[3rem] w-[100vw]  bg-(--aqua_color_hover) hover:min-[780px]:bg-amber-400 max-[780px]:h-[2.5rem]  border-b-[0.2rem] border-solid border-[red] flex items-center  pl-[3vw] pr-[3vw] no-underline" href={`/movieDetail?id=${id}`}>
      <div className="pointer-events-none max-[780px]:pl-[0.5rem] max-[780px]:pr-[0.5rem] w-[6vw] grow-0">{index}</div>
      <div className="pointer-events-none max-[780px]:pl-[0.5rem] max-[780px]:pr-[0.5rem] max-[780px]:h-[2.5rem]  content-center w-[5rem] overflow-hidden text-ellipsis grow h-[3rem]">{title}</div>
      <div className="pointer-events-none max-[780px]:pl-[0.5rem] max-[780px]:pr-[0.5rem] w-[14rem] grow-0">{isMobile ? date.slice(-4) : date}</div>
    </a>
  
  )
}
export default function SearchList({
  rowdata,
  rowdate,
}: {
  rowdate: string[]
  rowdata: MovieListType[]
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 780)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const components = []
  for (let i = 0; i < rowdata.length; i++) {
    components.push(
      <Component
        key={i}
        index={i + 1}
        date={rowdate[i]}
        title={rowdata[i].title}
        id={rowdata[i].id}
        isMobile={isMobile}
      />,
    )
  }
  return components
}
