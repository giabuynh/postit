'use client'

type ToggleProps = {
  action: (e: React.FormEvent) => void,
  data: {
    postTitle: string,
    setPostTitle: (title: string) => void,
    isDisable: boolean,
    setIsDisable: (isDisable: boolean) => void,
  }
}

export default function EditPost({ action, data }: ToggleProps) {
  return (
    <>
      <form onSubmit={action} className='bg-white rounded-md'>
        <div className='flex flex-col my-4'>
          <textarea
            cols={45}
            rows={3}
            name='postTitle'
            value={data.postTitle}
            placeholder="What's on your mind?"
            onChange={(e) => data.setPostTitle(e.target.value)}
            className='p-4 text-lg rounded-md my-2 bg-gray-200' />
        </div>
        <div className={`flex items-center justify-between gap-2`}>
          <p className={`font-bold text-sm ${data.postTitle.length > 300 ? 'text-red-700' : 'text-gray-700'}`}>
            {`${data.postTitle.length}/300`}
          </p>
          <button
            disabled={data.isDisable}
            type='submit'
            className='text-sm bg-purple-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'>
            Update
          </button>
        </div>
      </form>
    </>


  )
}