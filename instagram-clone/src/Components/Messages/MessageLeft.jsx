import { Search } from "lucide-react";
import MessageCard from "./MessageCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserMessageAction } from "../../Redux/User/Action";



const MessageLeft = ({ user, listPartner, recipient, setRecipient }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  
  const [query, setQuery] = useState("");

  const { searchUserMessage } = useSelector((store) => store.user); 

  const handleClick = () => {
    navigate(`/profile/${user.username}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
 
    if (value) {
      const data={ jwt:token,query: value }
      dispatch(searchUserMessageAction(data));
    }
  };

  return (
    <div className="w-[350px] border-r h-screen overflow-y-auto">
      <div onClick={handleClick} className="flex items-center mt-4 px-3 cursor-pointer">
        <img
          className="w-14 h-14 rounded-full"
          src={
            user?.image ||
            "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          }
          alt=""
        />
        <div className="p-4">
          <p className="font-semibold">{user?.fullname}</p>
          <p className="text-sm text-gray-500">@{user?.username}</p>
        </div>
      </div>

      <div className="px-3 pb-5 pt-3">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
          <Search className="text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
            className="
              bg-transparent
              outline-none
              border-none
              w-full
              text-sm
              placeholder-gray-500
            "
          />
        </div>
      </div>
     <p className="font-bold text-sm px-3 mb-2">Messages</p>


      {query && searchUserMessage?.length > 0
        ? searchUserMessage.map((user) => (
            <MessageCard
              key={user.id}
              partner={user}
              recipient={recipient}
              setRecipient={setRecipient}
            />
          ))
        : !query && listPartner.map((partner) => (
            <MessageCard
              key={partner.id}
              partner={partner}
              recipient={recipient}
              setRecipient={setRecipient}
            />
          ))
      }
      
      {query && searchUserMessage?.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-5">No user found</p>
      )}
    </div>
  );
};

export default MessageLeft;