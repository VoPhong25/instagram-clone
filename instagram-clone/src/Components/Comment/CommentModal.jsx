import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs"
import CommentCard from "./CommentCard"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { RiSendPlaneLine } from "react-icons/ri"
import "./CommentModal.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { createCommentAction, findCommentAction } from "../../Redux/Comment/Action"
import { findPostByIdAction } from "../../Redux/Post/Action"
import { timeDifference } from "../../Config/Logic"

const CommentModal = ({ onClose, isOpen, isSaved, isPostLiked, handlePostLike, handlePostSave

}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { postId } = useParams();
  console.log("nene----", postId)
  const {comment, post} = useSelector(store =>store);
  console.log("post:  ", post )

  useEffect(()=>{
    const data={jwt: token,
      postId
    }
    if(postId)
      dispatch(findPostByIdAction(data))
  }, [comment.createComment, postId, comment.likeComment, comment.deleteComment]
  )

  return (
    <div>
      <Modal size={'6xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>

          <ModalBody>
            <div className="flex h-[65vh] ">
              <div className="w-[50%] flex flex-col justify-center">
                <img className="max-h-full w-full" src={post.singlePost?.image} alt="" />
              </div>

              <div className="w-[50%] pl-6 relative">
                <div className="flex justify-between items-center py-2 ">
                  <div className="flex items-center">
                    <div>
                      <img className="h-12 w-12 rounded-full" src={post.singlePost?.user?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="" />
                    </div>
                    <div className="ml-2">
                      <p className="font-semibold">{post.singlePost?.user?.username}</p>
                      <p className="font-thin">{post.singlePost?.location}</p>
                    </div>
                  </div>
                  <BsThreeDots className="cursor-pointer" />
                </div>
                <hr />
                <div className="comment">
                  {post.singlePost?.comments?.map((item) => 
                  <CommentCard comment={item}/>)}
                </div>


                <div className="absolute bottom-0 inset-x-0 pl-6 bg-white">
                  <div className="flex justify-between items-center w-full py-4">
                    <div className="flex items-center space-x-4">
                      {isPostLiked ? <AiFillHeart className="text-2xl hover:opacity-50 cursor-pointer text-red-500" onClick={handlePostLike} /> : <AiOutlineHeart className="text-2xl hover:opacity-50 cursor-pointer" onClick={handlePostLike} />}
                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />
                      <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
                    </div>
                    <div className="cursor-pointer">
                      {isSaved ? <BsBookmarkFill className="text-xl hover:opacity-50 cursor-pointer" onClick={handlePostSave} /> : <BsBookmark className="text-xl hover:opacity-50 cursor-pointer" onClick={handlePostSave} />}
                    </div>
                  </div>

                  <div className="w-full ">
                 { post.singlePost?.totalLike > 0 && <p className="font-semibold">{post.singlePost?.totalLike} likes</p>}
                    <p className="opacity-50 py-2 text-sm">{timeDifference(post.singlePost?.createdAt)}</p>
                  </div>

                  <div className="flex items-center w-full pb-3">
                    <BsEmojiSmile />
                    <input
                      className="commentInput"
                      type="text"
                      placeholder="Add a comment..."
                      onChange={(e) => setCommentContent(e.target.value)}
                      value={commentContent}
                      onKeyPress={(e) =>  {
                        if (e.key === "Enter") {
                          const data =
                          {
                            postId, jwt: token, data: {content: commentContent}

                          }
                          dispatch(createCommentAction(data))
                          setCommentContent("")
                        }
                      }} />
                  </div>

                </div>
              </div>

            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CommentModal