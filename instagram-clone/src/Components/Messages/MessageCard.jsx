import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConversationAction } from '../../Redux/Message/Action';

const MessageCard = ({ partner, recipient, setRecipient }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const isActive = recipient?.id === partner.id;

  const handleClick = () => {
    setRecipient(partner);
      navigate(`/message/${partner.id}`);
    dispatch(getConversationAction({ jwt: token, otherId: partner.id }));
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer px-3 py-3 ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}>
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={partner?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
        />

        <div className="ml-3">
          <p className="font-medium">{partner?.fullname}</p>
          <p className="text-sm text-gray-500">
            @{partner?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
