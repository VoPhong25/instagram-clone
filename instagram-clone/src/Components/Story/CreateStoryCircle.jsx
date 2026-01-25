import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import CreateStoryModal from "./CreateStoryModal";
import { useDisclosure } from "@chakra-ui/react";

const CreateStoryCircle = ({ user }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <div
      onClick={onOpen}
      className="relative cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full border-2 border-gray-300"
        src={
          user?.image ||
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        }
        alt=""
      />

      {/* Nút + */}
      <div className="absolute bottom-4 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
        <Plus size={12} color="white" />
      </div>

      <p className="text-sm mt-1">Tin của bạn</p>
    </div>
     <CreateStoryModal isOpen={isOpen} onClose={onClose} />
     </>
  );
};

export default CreateStoryCircle;
