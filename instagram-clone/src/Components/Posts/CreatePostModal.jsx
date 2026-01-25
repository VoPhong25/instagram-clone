import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModal.css";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/Action";

const CreatePostModal = ({ onClose, isOpen }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const user = useSelector(store => store.user);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile?.type.startsWith("image/") || droppedFile?.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      const imgUrl = await uploadToCloudinary(file);
      setImageUrl(imgUrl);
      setFile(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select an image or video",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
    }
  };

  const handleCreatePost = async () => {
    if (!imageUrl) {
      toast({
        title: "No media selected",
        description: "Please select an image or video before sharing",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    try {
      const data = {
        jwt: token,
        data: {
          caption,
          location,
          image: imageUrl
        }
      };

      await dispatch(createPostAction(data));

      toast({
        title: "Post shared 🎉",
        description: "Your post has been successfully published",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      onClose();
      setFile(null);
      setImageUrl("");
      setCaption("");
      setLocation("");
    } catch (error) {
      toast({
        title: "Failed to share post",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Modal size="6xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="3xl">
        <div className="flex items-center justify-between py-3 px-10">
          <p className="font-semibold text-lg">Create new post</p>

          {/* 🔵 Button giống CreateStory */}
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleCreatePost}
            isDisabled={!imageUrl}
          >
            Share
          </Button>
        </div>
        <hr />

        <ModalBody>
          <div className="h-[60vh] justify-between pb-5 flex">
            <div className="w-[50%]">
              {!file ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className="drag-drop h-full"
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <FaPhotoVideo className="text-6xl" />
                    <p>Drag photos and videos here</p>
                  </div>

                  <label htmlFor="file-upload" className="custom-file-upload">
                    Select from computer
                  </label>
                  <input
                    className="fileInput"
                    type="file"
                    id="file-upload"
                    accept="image/*, video/*"
                    onChange={handleOnChange}
                  />
                </div>
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              )}
            </div>

            <div className="w-[1px] ml-5 border h-full"></div>

            <div className="w-[50%]">
              <div className="flex items-center px-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={
                    user.reqUser?.image ||
                    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                  }
                  alt=""
                />
                <p className="font-semibold ml-4">
                  {user.reqUser?.username}
                </p>
              </div>

              <div className="px-3 mb-12">
                <textarea
                  placeholder="Write a caption"
                  className="captionInput"
                  rows="8"
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center px-3 pb-2">
                <GrEmoji />
                <p className="opacity-70">{caption.length}/2,200</p>
              </div>

              <hr />

              <div className="flex justify-between items-center p-3">
                <input
                  onChange={(e) => setLocation(e.target.value)}
                  className="locationInput"
                  type="text"
                  placeholder="Location"
                />
                <GoLocation />
              </div>
              <hr />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
