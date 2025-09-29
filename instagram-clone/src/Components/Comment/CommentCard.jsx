import { useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

const CommentCard = () => {
    const [isCommentLiked, setIsCommentLiked] = useState(false)
    const handleCommentLiked = () => {
        setIsCommentLiked(!isCommentLiked)
    }
    return (
        <div>
            <div className="flex items-center justify-between py-5">
                <div className="flex items-center ">
                    <div>
                        <img className="w-12 h-12 rounded-full" src="https://cdn.pixabay.com/photo/2025/08/02/14/53/pied-cuckoo-9750790_1280.jpg" alt="" />
                    </div>
                    <div className="ml-3">
                        <p>
                            <span className="font-semibold">vophong</span>
                            <span className="ml-2">nice</span>
                        </p>
                        <div className="flex items-center space-x-3 text-sm opacity-60 pt-2">
                            <span>10 min ago</span>
                            <span>10 likes</span>
                        </div>
                    </div>
                </div>
                {isCommentLiked ? <AiFillHeart className="hover:opacity-50 cursor-pointer text-red-500" onClick={handleCommentLiked} /> : <AiOutlineHeart className="hover:opacity-50 cursor-pointer" onClick={handleCommentLiked} />}
            </div>
        </div>
    )
}

export default CommentCard