

const SuggetionCard = () => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <img className="w-12 h-12 rounded-full" src="https://cdn.pixabay.com/photo/2019/01/27/22/33/chipmunk-3959206_640.jpg" alt="" />
            <div className='ml-2  '>
                <p className='text-sm font-semibold'>username</p>
                <p className='text-sm font-semibold opacity-70'>Follows you</p>
            </div>
        </div>
        <p className='text-sm font-semibold text-blue-700 '>Follow</p>

    </div>
  )
}

export default SuggetionCard