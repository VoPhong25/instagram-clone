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
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createStoryAction } from "../../Redux/Story/Action";

const CreateStoryModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const token = localStorage.getItem("token");

  const handleOnChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setFile(selectedFile);
    const url = await uploadToCloudinary(selectedFile);
    setImageUrl(url);
  };

  const handleCreateStory = async () => {
    if (!imageUrl) return;

    try {
      await dispatch(
        createStoryAction({
          jwt: token,
          data: { image: imageUrl }
        })
      );

      toast({
        title: "Story shared 🎉",
        description: "Your story has been successfully posted",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      onClose();
      setFile(null);
      setImageUrl("");
    } catch (error) {
      toast({
        title: "Failed to share story",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="2xl">
        <ModalCloseButton />

        <ModalBody className="p-6">
          {!file ? (
            <div className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-300 rounded-xl">
              <FaPhotoVideo className="text-5xl mb-4" />
              <p className="mb-3">Select an image to create a story</p>

              <label
                htmlFor="story-upload"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
              >
                Choose from computer
              </label>
              <input
                id="story-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={handleOnChange}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-full h-80 object-cover rounded-xl"
              />
              <Button
                onClick={handleCreateStory}
                colorScheme="blue"
                className="absolute bottom-4 right-4"
              >
                Share story
              </Button>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateStoryModal;
