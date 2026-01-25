import { useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from "react-icons/bs";
import "./PostCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import CommentModal from "../Comment/CommentModal";
import { useDisclosure, useToast } from "@chakra-ui/react"; // 1. Import useToast
import { useDispatch, useSelector } from "react-redux";
import { likePostAction, savePostAction, deletePostAction } from "../../Redux/Post/Action"; // 2. Import delete action
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast(); // 3. Khởi tạo toast
    const token = localStorage.getItem("token");
    const reqUser = useSelector((store) => store.user.reqUser);

    const data = { jwt: token, postId: post?.id };

    const handleOpenProfile = () => {
        navigate(`/profile/${reqUser?.username}`);
    }

    const handlePostLike = () => {
        setIsPostLiked(!isPostLiked);
        dispatch(likePostAction(data));
    };

    const handlePostSave = () => {
        setIsSaved(!isSaved);
        dispatch(savePostAction(data));
    };

    const handleOpenCommentModal = () => {
        navigate(`/comment/${post.id}`);
        onOpen();
    };
const handleCloseCommentModal = () => {
        onClose(); 
        navigate(-1);
    };
    const handleDeletePost = async () => {
        if (reqUser?.id !== post?.user?.id) {
             toast({
                title: "Permission Denied",
                description: "You can't delete other user's post",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            setShowDropDown(false);
            return;
        }

        const data = {jwt:token, postId:post?.id}        
        const result = await dispatch(deletePostAction(data));

        if (result.success) {
            toast({
                title: "Post Deleted",
                description: result.message,
                status: "success",
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: result.message, // Thông báo từ backend trả về
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
        setShowDropDown(false);
    };

    useEffect(() => {
        setIsPostLiked(post?.liked);
        setIsSaved(post?.saved);
    }, [post]);

    return (
        <div className="border border-slate-200 rounded-md w-full mb-5">
            <div className="flex justify-between items-center w-full py-4 px-5">
                <div onClick={handleOpenProfile} className="flex items-center cursor-pointer">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={
                            post.user?.image ||
                            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                        }
                        alt=""
                    />
                    <div className="ml-2">
                        <p className="font-semibold text-sm">{post?.user?.username}</p>
                        <p className="font-thin text-sm">{post?.location}</p>
                    </div>
                </div>
                <div className="dropdown relative"> {/* Thêm relative để dropdown hiện đúng chỗ */}
                    <BsThreeDots
                        className="dots cursor-pointer"
                        onClick={() => setShowDropDown(!showDropDown)}
                    />
                    {showDropDown && (
                        <div className="dropdown-content absolute right-0 mt-2 bg-white shadow-lg rounded-md z-10 border">
                            {/* Gọi hàm handleDeletePost khi click */}
                            <p onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer text-sm font-semibold transition-all">
                                Delete
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* ... Phần hiển thị ảnh và nội dung bài viết giữ nguyên ... */}
            <img className="w-full" src={post?.image} alt="" />

            <div className="flex justify-between items-center w-full px-5 py-4">
               {/* ... Giữ nguyên các icon like/share ... */}
               <div className="flex items-center space-x-4">
                    {isPostLiked ? (
                        <AiFillHeart className="text-2xl text-red-500 cursor-pointer" onClick={handlePostLike} />
                    ) : (
                        <AiOutlineHeart className="text-2xl cursor-pointer" onClick={handlePostLike} />
                    )}
                    <FaRegComment onClick={handleOpenCommentModal} className="text-xl cursor-pointer" />
                    <RiSendPlaneLine className="text-xl cursor-pointer" />
                </div>

                {isSaved ? (
                    <BsBookmarkFill className="text-xl cursor-pointer" onClick={handlePostSave} />
                ) : (
                    <BsBookmark className="text-xl cursor-pointer" onClick={handlePostSave} />
                )}
            </div>

            {/* ... Phần caption và comment giữ nguyên ... */}
            <div className="px-5">
                {post?.totalLike > 0 && <p className="font-semibold">{post.totalLike} likes</p>}
            </div>

            {post?.caption && (
                <div className="px-5 pt-1 caption-wrapper">
                    <div className={`caption-line ${showMore ? "expanded" : ""}`}>
                        <span className="caption-username">{post?.user?.username}</span>
                        <span>{post.caption}</span>
                    </div>
                    {post.caption.length > 80 && (
                        <div className="see-more" onClick={() => setShowMore(!showMore)}>
                            {showMore ? "see less" : "see more"}
                        </div>
                    )}
                </div>
            )}

            <div className="px-5">
                {post.totalComment > 0 && (
                    <p onClick={handleOpenCommentModal} className="opacity-50 py-2 cursor-pointer">View all {post.totalComment} comments</p>
                )}
            </div>

            <div className="flex items-center px-5 pb-4">
                <BsEmojiSmile />
                <input className="commentInput" type="text" placeholder="Add a comment..." />
            </div>

            <CommentModal
                handlePostLike={handlePostLike}
                onClose={handleCloseCommentModal}
                isOpen={isOpen}
                handlePostSave={handlePostSave}
                isPostLiked={isPostLiked}
                isSaved={isSaved}
            />
        </div>
    );
};

export default PostCard;