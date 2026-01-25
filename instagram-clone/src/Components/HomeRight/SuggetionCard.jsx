

const SuggetionCard = ({user}) => {
  return (
    <div className='flex justify-between items-center'>
        <div className='flex items-center'>
            <img className="w-12 h-12 rounded-full" src={user.iamge || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="" />
            <div className='ml-2  '>
                <p className='text-sm font-semibold'>{user.username}</p>
                <p className='text-sm font-semibold opacity-70'>Popular</p>
            </div>
        </div>
        <p className='text-sm font-semibold text-blue-700 '>Follow</p>

    </div>
  )
}

export default SuggetionCard