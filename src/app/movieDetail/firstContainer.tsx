import { AllType } from '../api/types.ts'
import AttributeContainer from './attributeContainer.tsx'
export default function FirstContainer({
  detail,
  genre,
  date,
  isMobile,
}: {
  detail: AllType
  genre: string
  date: string
  isMobile: boolean
}) {
  return (
    <div className='flex w-[100%] pb-[3rem]'>
      <div className='max-[780px]:pl-[1.5rem] pt-[5.7rem] pl-[3rem]'>
        {detail.posterPath == null  ? (
          <div className='max-[1330px]:w-[19vw] max-[1330px]:h-[24vw] max-[920px]:w-[10rem] max-[920px]:h-[13rem] max-[920px]:text-[1rem] max-[920px]:border-[0.3rem] overflow-clip text-[2.3vw] p-[0.8vw] w-[15rem] h-[20rem] text-[blueviolet] border-[0.5rem] border-[white] border-solid'>{detail.title}</div>
        ) : (
          <img
            alt="imageMovie"
            className=' min-[780px]:hover:border-(--border_color) max-[1330px]:w-[19vw] max-[1330px]:h-auto max-[920px]:w-[10rem] max-[920px]:h-auto [w-[15rem] h-auto border-[0.5rem]   border-solid border-white'
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${detail.posterPath}`}
          />
        )}
      </div>
      <AttributeContainer detail={detail} genre={genre} date={date} isMobile={isMobile} />
    </div>
  )
}