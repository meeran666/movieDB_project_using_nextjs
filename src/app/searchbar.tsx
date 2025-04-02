'use client'
import { FormEvent, useState } from 'react'
import type { WrappedMovieListType } from '@/src/app/api/types.ts'
import SearchList from './searchList.tsx'

function SpaceBoard() {
  return <div className="grow w-[100vw] bg-(--black_color) "></div>
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
    console.log('inside submit')
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
      console.log('data')
      console.log(data)
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
      <div className="bg-(--black_color) w-[100vw] h-[16.8rem] flex justify-center items-center border-b-[0.2rem] border-solid border-[red]">
        <form className="max-[780px]:grow max-[780px]:p-[1rem] h-[10rem] w-[55vw]" onSubmit={handleSubmit}>
          <label className='max-[780px]:text-[1rem] text-[red] text-[1.6rem] font-[bolder]'htmlFor="title">Search Movie:</label>
          <br />
          <div className="max-[780px]:flex-nowrap flex flex-wrap h-[9rem]">
            <input
              className='max-[780px]:h-[1.8rem] max-[780px]:w-[1.3rem] overflow-hidden h-[2.2rem] grow-1 text-[1rem] mt-[1rem] border-none bg-[white] shadow-none outline-none rounded-[0.1rem] pl-[0.4rem]'
              onChange={e => setSearch(e.target.value)}
              type="text"
              name="title"
              value={search}
              placeholder="search movie"
            />
            <button className="max-[780px]:w-[5rem] max-[780px]:h-[1.9rem] rounded-[0.2rem] border-none w-[6.6rem] text-(--button_color) font-[bolder] h-[2.4rem] ml-[1rem] mt-[0.9rem] pl-[0.2rem] bg-(--voilet_color) outline-none"type="submit">Search</button>
          </div>
        </form>
      </div>
      {result ? <SearchList rowdata={result.rowdata} rowdate={result.rowdate} /> : null}
      <SpaceBoard />
    </>
  )
}
