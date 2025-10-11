import React from 'react'
import StoryViewr from '../../Components/StoryComponents/StoryViewr'

const Story = () => {
    const story = [
        {
            image: "https://images.pexels.com/photos/33329501/pexels-photo-33329501.jpeg"
        }, {
            image: "https://images.pexels.com/photos/34111858/pexels-photo-34111858.jpeg"
        }, {
            image: "https://images.pexels.com/photos/18207254/pexels-photo-18207254.jpeg"
        }, {
            image: "https://images.pexels.com/photos/33050586/pexels-photo-33050586.jpeg"
        }, {
            image: "https://images.pexels.com/photos/34114428/pexels-photo-34114428.jpeg"
        }
    ]
    return (
        <div>
            <StoryViewr stories={story} />
        </div>
    )
}

export default Story