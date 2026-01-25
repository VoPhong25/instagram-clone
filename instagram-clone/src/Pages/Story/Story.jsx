import { useEffect } from 'react'
import StoryViewr from '../../Components/StoryComponents/StoryViewr'
import { findAllStoryAction } from '../../Redux/Story/Action'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Story = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token')
    const story = useSelector(store => store.story)


    useEffect(() => {
        if (userId && token) {
            dispatch(findAllStoryAction({ jwt: token, userId }))
        }

    }, [userId, token, dispatch])

    return (
        <div>
            <StoryViewr stories={story.getAllStory} />
        </div>
    )
}

export default Story