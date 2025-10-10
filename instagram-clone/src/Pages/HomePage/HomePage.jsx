import React from 'react'
import StoryCircle from '../../Components/Story/StoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Posts/PostCard'

const HomePage = () => {
  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[50%] px-10'>
          <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
            {[1, 1, 1].map((item) => (<StoryCircle />))}
          </div>
          <div className='space-y-5 mt-10 w-full'>
            {[1,1].map((item) => (<PostCard/>))}
          </div>
        </div>
        <div className='w-[35%] px-20'>
          <HomeRight />
        </div>
      </div>
    
    </div>
  )
}

export default HomePage