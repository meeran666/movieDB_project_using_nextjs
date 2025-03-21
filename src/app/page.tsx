'use client'
import searchbar_styles from '@/styles/searchbar.module.css'
import { FormEvent, useState } from 'react'
import type { WrappedMovieListType } from '@/src/app/api/types.ts'
import SearchList from './searchList.tsx'

function SpaceBoard() {
  return <div className={searchbar_styles.spaceboard}></div>
}
function isApiResponse(data: unknown): data is WrappedMovieListType {
  return (
    typeof data === 'object' && data !== null && 'rowdata' in data && Array.isArray(data.rowdata)
  )
}

export default function SearchBox() {
  const [search, setSearch] = useState<string>('')
  const [result, setResult] = useState<WrappedMovieListType | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      //request send with data
      const response = await fetch(`/api/movieList?name=${search}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { search } }),
      })

      //response result
      const data: unknown = await response.json()
      if (isApiResponse(data)) {
        console.log('Fetched movies')
        setResult(data)
      } else {
        console.error('Invalid API response structure')
      }
      if (response.ok) {
        console.log('ok response')
      } else {
        console.error('bad response')
      }
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }
  return (
    <>
      <div className={searchbar_styles.blank_box}>
        <form className={searchbar_styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title">Search Movie:</label>
          <br />
          <div className={searchbar_styles.search_bar}>
            <input
              onChange={e => setSearch(e.target.value)}
              type="text"
              name="title"
              value={search}
              placeholder="search movie"
            />
            <button type="button">Search</button>
          </div>
        </form>
      </div>
      {result ? <SearchList rowdata={result.rowdata} rowdate={result.rowdate} /> : null}
      <SpaceBoard />
    </>
  )
}
