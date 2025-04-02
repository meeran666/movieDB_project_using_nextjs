import { AllType } from '../api/types.ts'
export default function SynopsisContainer({ detail }: { detail: AllType }) {
  return (
    <div className='max-[780px]:m-[1.4rem] max-[780px]:text-[1rem] text-white flex flex-col border-[2px] border-solid border-white rounded-[1rem] m-[2rem] text-[1.3rem] pr-[1rem] pl-[1rem] pb-[1rem] pt-[1rem]'>
      <div className='pb-[1rem]'>synopsis &#11088;</div>
      <div>{detail.overview}</div>
    </div>
  )
} 