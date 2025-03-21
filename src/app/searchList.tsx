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
    <a className={list_styles.row + ' ' + list_styles.disable_hover} href={`/movieDetail?id=${id}`}>
      <div className={list_styles.first_inside_div}>{index}</div>
      <div className={list_styles.second_inside_div}>{title}</div>
      <div className={list_styles.third_inside_div}>{isMobile ? date.slice(-4) : date}</div>
    </a>
  )
}
export default function SearchList({
  rowdata,
  rowdate,
}: {
  rowdata: MovieListType[]
  rowdate: string[]
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
