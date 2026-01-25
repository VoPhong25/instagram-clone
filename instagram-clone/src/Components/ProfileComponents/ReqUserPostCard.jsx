import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import "./ReqUserPostCard.css"

const ReqUserPostCard = ({post}) => {
    console.log("post----", post)
    return (
        <div className="p-2">
            <div className="post w-60 h-60">
                <img className="cursor-pointer" src={post.image} alt="" />
                <div className="overlay">
                    <div className="overlay-text flex justify-between">
                        <div>
                            <AiFillHeart></AiFillHeart> <span>{post.totalLike}</span>
                        </div>
                        <div>
                            <FaComment></FaComment><span>{post.totalComment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReqUserPostCard