'use client'

type ToggleProps = {
  action: () => void,
}

export default function DeletePost({ action }: ToggleProps) {
  return (
    <>
      <h2 className='text-xl'>
        Are you sure you want to delete this post? 😢
      </h2>
      <h3 className='text-red-600 text-sm'>
        Pressing the delete button will permenantly delete your post
      </h3>
      <button onClick={action} className='bg-red-600 text-sm text-white py-2 px-4 rounded-md'>
        Delete Post
      </button>
    </>
  )
}