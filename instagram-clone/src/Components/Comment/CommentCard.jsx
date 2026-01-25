import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BsThreeDots } from "react-icons/bs" // 1. Import Icon 3 chấm
import { timeDifference } from "../../Config/Logic"
import { useDispatch, useSelector } from "react-redux"
import { likeCommentAction, deleteCommentAction } from "../../Redux/Comment/Action" // 2. Import delete action
import { useToast } from "@chakra-ui/react" // 3. Import Toast

const CommentCard = ({ comment }) => {
    const [isCommentLiked, setIsCommentLiked] = useState(false)
    const [showDropDown, setShowDropDown] = useState(false) // State cho dropdown

    const dispatch = useDispatch();
    const toast = useToast();
    const { reqUser } = useSelector(store => store.user); // Lấy user hiện tại để check quyền
    const token = localStorage.getItem("token")

    const data = {
        commentId: comment.id,
        jwt: token
    }

    const handleCommentLiked = () => {
        setIsCommentLiked(!isCommentLiked)
        dispatch(likeCommentAction(data))
    }

    // --- HÀM XỬ LÝ XÓA COMMENT ---
    const handleDeleteComment = async () => {
        // Kiểm tra quyền: Chỉ chính chủ comment mới được xóa
        if (reqUser?.id !== comment?.userMiniDTO?.id) {
            toast({
                title: "Error",
                description: "You can't delete other people's comment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setShowDropDown(false);
            return;
        }

        const result = await dispatch(deleteCommentAction(data));

        if (result.success) {
            toast({
                title: "Deleted",
                description: "Comment deleted successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: result.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setShowDropDown(false);
    }

    useEffect(() => {
        setIsCommentLiked(comment?.liked);
    }, [comment.likeComment, comment?.liked]);

    return (
        // Thêm class 'group' vào cha để xử lý hover
        <div className="group w-full"> 
            <div className="flex items-start justify-between py-5">

                <div className="flex items-start flex-1 min-w-0">
                    <img
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        src={comment.userMiniDTO.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                        alt=""
                    />

                    <div className="ml-3 min-w-0 flex-1">
                        <p className="text-sm">
                            <span className="font-semibold">
                                {comment.userMiniDTO?.username}
                            </span>
                            <span className="ml-2 break-words whitespace-pre-wrap">
                                {comment.content}
                            </span>
                        </p>

                        <div className="flex items-center space-x-3 text-sm opacity-60 pt-2 relative">
                            <span>{timeDifference(comment.createdAt)}</span>
                            {comment.totalLikes > 0 && <span>{comment.totalLikes} likes</span>}
                            
                            {/* --- NÚT 3 CHẤM & DROPDOWN --- */}
                            {/* group-hover:block: Chỉ hiện khi hover vào thẻ cha (div className='group') */}
                            {/* hidden: Ẩn mặc định */}
                            <div className="relative group-hover:block hidden">
                                <BsThreeDots 
                                    className="cursor-pointer hover:text-black transition-all"
                                    onClick={() => setShowDropDown(!showDropDown)}
                                />
                                
                                {showDropDown && (
                                    <div className="absolute left-0 top-5 bg-white border shadow-lg rounded-md z-10 p-1">
                                        <div 
                                            onClick={handleDeleteComment}
                                            className="text-red-500 hover:bg-slate-100 px-3 py-1 rounded cursor-pointer text-xs font-semibold whitespace-nowrap"
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isCommentLiked ? (
                    <AiFillHeart
                        className="ml-4 flex-shrink-0 mt-1 hover:opacity-50 cursor-pointer text-red-500"
                        onClick={handleCommentLiked}
                    />
                ) : (
                    <AiOutlineHeart
                        className="ml-4 flex-shrink-0 mt-1 hover:opacity-50 cursor-pointer"
                        onClick={handleCommentLiked}
                    />
                )}
            </div>
        </div>
    )
}

export default CommentCard