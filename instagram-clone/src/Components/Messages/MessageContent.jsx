import {
  Phone,
  Video,
  Info,
  Image,
  Mic,
  Smile,
  Send
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAction, sendMessageAction } from "../../Redux/Message/Action";


const MessageContent = ({ recipient, currentUserId }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");
  const { user } = useSelector((store) => store.user);
  const conversation = useSelector((store) => store.message.conversation);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!recipient?.id) return;
    dispatch(getConversationAction({ jwt: token, otherId: recipient.id }));
  }, [recipient?.id]);


  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSendMessage = () => {
    if (!content.trim() || !recipient?.id) return;

    dispatch(sendMessageAction({
      jwt: token,
      recipientId: recipient.id,
      content: content.trim(),
      imageUrl: null
    }));

    setContent("");
  };

  if (!recipient) {

    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <p className="text-lg font-medium">Your messages</p>
          <p className="text-sm"> Send private photos and messages to a friend or group. </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"> Send message </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <img
            src={
              recipient.image ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            alt={recipient.fullname}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="font-semibold">{recipient.fullname}</p>
            <p className="text-sm text-gray-500">@{recipient.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <Phone size={20} className="cursor-pointer hover:text-gray-800 text-gray-600" />
          <Video size={20} className="cursor-pointer hover:text-gray-800 text-gray-600" />
          <Info size={20} className="cursor-pointer hover:text-gray-800 text-gray-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {Array.isArray(conversation) && conversation.length > 0 ? (
          conversation.map((item, index) => {
            if (!item || !item.sender) return null;

            const isMe = String(item.sender.id) === String(currentUserId);

            return (
              <div
                key={item.id || `msg-${index}-${item.createdAt}`}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs text-sm break-words
                    ${isMe
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                >
                  {item.content}
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(item.createdAt).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t px-4 py-3 flex items-center gap-3">
        <Smile className="text-gray-500 cursor-pointer hover:text-gray-700" />
        <Image className="text-gray-500 cursor-pointer hover:text-gray-700" />
        <Mic className="text-gray-500 cursor-pointer hover:text-gray-700" />

        <input
          className="flex-1 border rounded-full px-4 py-2 outline-none focus:border-blue-500"
          placeholder="Message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
        />

        <button
          onClick={handleSendMessage}
          className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
          disabled={!content.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageContent;