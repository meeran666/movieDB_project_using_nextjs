'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Detail from './detail.tsx'
import { PosterDetailType, WrappedAllType, WrappedPosterDetailType } from '../api/types.ts'
function isApiResponseofData1(data1: unknown): data1 is WrappedAllType {
  return typeof data1 === 'object' && data1 !== null && 'detail' in data1
}
function isApiResponseofData2(data2: unknown): data2 is WrappedPosterDetailType {
  return (
    typeof data2 === 'object' &&
    data2 !== null &&
    'posterData' in data2 &&
    Array.isArray(data2.posterData)
  )
}
function DetailLayout() {
  const [resultDetail, setResultDetail] = useState<WrappedAllType | null>(null)
  const [posterDetail, setPosterDetail] = useState<PosterDetailType[] | null>(null)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          //1st response
          const response = await fetch(`api/movieDetail?id=${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const data1: unknown = await response.json()
          if (isApiResponseofData1(data1)) {
            console.log('Fetched detail of movie')
            //2nd response
            fetch(`api/posterPath?title=${data1.detail.title}&selfid=${data1.detail.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then(data2 => {
                return data2.json()
              })
              .then((data2: unknown) => {
                if (isApiResponseofData2(data2)) {
                  setPosterDetail(data2.posterData)
                }
              })
            setResultDetail(data1)
          } else {
            console.error('Invalid API response structure')
          }
        } catch (error) {
          console.error('Error adding data:', error)
        }
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      {resultDetail ? (
        <>
          <Detail
            detail={resultDetail.detail}
            date={resultDetail.date}
            genre={resultDetail.genre}
            posterDetail={posterDetail}
          />
        </>
      ) : null}
    </>
  )
}
export default function wrappedLayout() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <DetailLayout />
    </Suspense>
  )
}
