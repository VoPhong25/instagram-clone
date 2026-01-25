import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageLeft from "../../Components/Messages/MessageLeft";
import MessageContent from "../../Components/Messages/MessageContent";
import { getListPartnerAction} from "../../Redux/Message/Action";

const Message = () => {
  const { user, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    if(!token) return;
    dispatch(getListPartnerAction(token));
  }, [token, dispatch]);


  return (
    <div className="flex h-screen">
      <MessageLeft
        user={user.reqUser}
        listPartner={message.listPartner}
        recipient={recipient}
        setRecipient={setRecipient}
      />

      <MessageContent
        recipient={recipient}
        currentUserId={user.reqUser?.id}
      />
    </div>
  );
};

export default Message;
