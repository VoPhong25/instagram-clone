import React, { useEffect, useState } from 'react'
import StoryCircle from '../../Components/Story/StoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Posts/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { findPostByUserIdsAction } from '../../Redux/Post/Action'
import { findUserByUserIdsAction, getPopularUserAction } from '../../Redux/User/Action'
import { hasStory } from '../../Config/Logic'
import CreateStoryCircle from '../../Components/Story/CreateStoryCircle'

const HomePage = () => {
const user = useSelector(store => store.user);
const post = useSelector(store => store.post);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
//  console.log("Token:   ", token)

useEffect(() => {
  if (!token) return;

  dispatch(findPostByUserIdsAction(token))
  dispatch(getPopularUserAction(token))
    dispatch(findUserByUserIdsAction(token))
}, [token, post.createPost, post.deletePost])

const storyUsers = hasStory(user.findUserByIds)

  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[50%] px-10'>
          <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
            <CreateStoryCircle user={user.reqUser} />
            {storyUsers.length>0 && storyUsers.map((item) => (<StoryCircle user={item}/>))}
          </div>
          <div className='space-y-5 mt-10 w-full'>
            {post.usersPost?.length>0 && post.usersPost.map((item) =>
               (<PostCard post={item} />))}
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