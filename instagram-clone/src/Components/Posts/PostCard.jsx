import { useState } from "react"
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs"
import "./PostCard.css"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentModal from "../Comment/CommentModal";

const PostCard = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handlePostLike = () => {
        setIsPostLiked(!isPostLiked)
    }

    const handlePostSave = () => {
        setIsSaved(!isSaved)
    }

    const handleClick = () => {
        setShowDropDown(!showDropDown)
    }
    return (
        <div>
            <div className="border border-slate-200 rounded-md w-full">
                <div className="flex justify-between items-center w-full py-4 px-5">
                    <div className="flex items-center">
                        <img className="w-12 h-12 rounded-full"
                            src="https://cdn.pixabay.com/photo/2025/08/13/15/30/elephant-9772462_1280.jpg"
                            alt="" />
                        <div>
                            <p className="font-semibold text-sm">username</p>
                            <p className="font-thin text-sm">location</p>
                        </div>
                    </div>
                    <div className="dropdown">
                        <BsThreeDots className="dots" onClick={handleClick} />
                        <div className="dropdonw-content">
                            {showDropDown && <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">Delete</p>}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <img className="w-ful" src="https://cdn.pixabay.com/photo/2018/09/24/14/00/roses-3700004_1280.jpg" alt="" />
                </div>
                <div className="flex justify-between items-center w-full px-5 py-4">
                    <div className="flex items-center space-x-4">
                        {isPostLiked ? <AiFillHeart className="text-2xl hover:opacity-50 cursor-pointer text-red-500" onClick={handlePostLike} /> : <AiOutlineHeart className="text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike} />}
                        <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                        <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                        {isSaved ? <BsBookmarkFill className="text-xl hover:opacity-50 cursor-pointer" onClick={handlePostSave} /> : <BsBookmark className="text-xl hover:opacity-50 cursor-pointer" onClick={handlePostSave} />}
                    </div>
                </div>
                <div className="w-full px-5">
                    <p className="font-semibold">100 likes</p>
                    <p className="opacity-50 py-2 cursor-pointer">View all 10 comments</p>
                </div>
                <div className="w-full">
                    <div className="flex items-center w-full px-5">
                        <BsEmojiSmile/>
                        <input className="commentInput" type="text" placeholder="Add a comment..."/>
                    </div>
                </div>
            </div>
            <CommentModal/>
        </div>
    )
}

export default PostCard