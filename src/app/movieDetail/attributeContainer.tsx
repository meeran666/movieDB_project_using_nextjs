import { AllType } from '../api/types.ts'
import SecondGroup from './secondGroup.tsx'
export default function AttributeContainer({
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
    <div className=' flex flex-col text-[white] pl-[10%] pt-[5.7rem] text-[1.3rem]'>
      <div className='max-[780px]:text-[1.6rem] max-[780px]:pb-[2rem] text-[4rem] pb-[2rem]'>{detail.title}</div>
      {detail.releaseDate != null ? <div className='max-[780px]:text-[1.2rem] text-[1.5rem]'>{date}</div> : null}
      <div className='max-[780px]:text-[1.2rem] text-[1.5rem]'>{genre}</div>
      <div className='max-[780px]:pb-[3rem] max-[780px]:text-[1.2rem] pb-[3rem] text-[1.5rem]'>{detail.adult == false ? 'PG' : ' Adult'}</div>
      {isMobile ? null : <SecondGroup detail={detail} />}
    </div>
  )
}