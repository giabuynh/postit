'use client'

type ToggleProps = {
  target: string,
  action: () => void,
}

export default function DeleteModal({ target, action }: ToggleProps) {
  return (
    <>
      <h2 className='text-xl'>
        Are you sure you want to delete this {target}? 😢
      </h2>
      <h3 className='text-red-600 text-sm'>
        Pressing the delete button will permenantly delete your {target}
      </h3>
      <button onClick={action} className='bg-red-600 text-sm text-white py-2 px-4 rounded-md capitalize'>
        Delete {target}
      </button>
    </>
  )
}