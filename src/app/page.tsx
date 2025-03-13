'use client'
import searchbar_styles from '@/styles/searchbar.module.css'
import { useState } from 'react'
// import SearchList from './searchList.tsx'
function SpaceBoard() {
  return <div className={searchbar_styles.spaceboard}></div>
}

export default function SearchBox() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)

  const handleClick = async (event: MouseEvent) => {
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
      setResult(data)
      if (response.ok) {
        // setIsresult(true)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error('Error adding data:', error)
    }
  }
  return (
    <>
      <div className={searchbar_styles.blank_box}>
        <form className={searchbar_styles.form}>
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
            <button type="submit" onClick={handleClick}>
              Search
            </button>
          </div>
        </form>
      </div>
      {result ? <SearchList rowdata={result.rowdata} rowdate={result.rowdate} /> : null}
      <SpaceBoard />
    </>
  )
}
