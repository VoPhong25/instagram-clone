import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { BsBookmark, BsBookmarkFill, BsThreeDots } from "react-icons/bs"
import CommentCard from "./CommentCard"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { RiSendPlaneLine } from "react-icons/ri"

const CommentModal = ({ onClose, isOpen, isSaved, isPostLiked, handlePostLike, handlePostSave }) => {
  return (
    <div>
      <Modal size={'6xl'} onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>

          <ModalBody>
            <div className="flex h-[85vh]">
              <div className="w-[50%] flex flex-col justify-center">
                <img className="max-h-full w-full" src="https://cdn.pixabay.com/photo/2018/09/24/14/00/roses-3700004_1280.jpg" alt="" />
              </div>
              <div className="w-[50%] pl-6 border border-slate-300">
                <div className="flex justify-between items-center py-2 ">
                  <div className="flex items-center">
                    <div>
                      <img className="h-12 w-12 rounded-full" src="https://cdn.pixabay.com/photo/2025/08/13/15/30/elephant-9772462_1280.jpg" alt="" />
                    </div>
                    <div className="ml-2">
                      <p className="font-semibold">username</p>
                      <p className="font-thin">location</p>
                    </div>
                  </div>
                  <BsThreeDots className="cursor-pointer" />
                </div>
                <hr />
                <div>
                  {[1, 1, 1, 1].map((item) => <CommentCard />)}
                </div>
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
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CommentModal