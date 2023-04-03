'use client'

import { BsXLg } from 'react-icons/bs'
import DeletePost from './DeletePost'
import EditPost from './EditPost'

type ToggleProps = {
  toggleType: string,
  setToggle: (toggle: boolean) => void,
  action: any, // ? Promise<void>
  data?: any
}

export default function Toggle({ toggleType, setToggle, action, data }: ToggleProps) {
  return (
    <div className='fixed bg-black/50 w-full h-full left-0 top-0 z-20'>
      <div className='absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6'>
        <div className='absolute top-0 right-0 m-5'>
          <BsXLg
            className='text-gray-700 text-sm cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              setToggle(false)
            }} />
        </div>
        {toggleType === 'del'
          ? (
            <DeletePost action={action} />
          )
          : (
            <EditPost action={action} data={data} />
          )}
      </div>
    </div>
  )
}