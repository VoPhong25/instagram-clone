import { useEffect, useState } from "react"
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai"
import { BiBookmark } from "react-icons/bi"
import { RiVideoAddLine } from "react-icons/ri"
import ReqUserPostCard from "./ReqUserPostCard"
import { useDispatch, useSelector } from "react-redux"
import { findPostByUserIdAction } from "../../Redux/Post/Action"

const ReqUserPostPart =({ user, isRequser })=> {
  const [activeTab, setActiveTab] = useState("Post")
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const post = useSelector(store=>store.post)
  const tabs = [
    { tab: "Post", icon: <AiOutlineTable /> },
    { tab: "Reels", icon: <RiVideoAddLine /> },

    // 👇 chỉ hiện khi là profile của mình
    ...(isRequser
      ? [
          { tab: "Saved", icon: <BiBookmark /> },
          { tab: "Tagged", icon: <AiOutlineUser /> }
        ]
      : [])
  ];
  
  useEffect(()=>{
    if(user){
   const data ={jwt:token, userId:user?.id}
      dispatch(findPostByUserIdAction(data))
    }
  }, [user, post.createPost])

  return (
    <div className="">
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div onClick={() => setActiveTab(item.tab)}
            className={`${activeTab === item.tab ? "border-t border-black" : "opacity-60"} 
            flex items-center cursor-pointer py-2 text-sm `}>
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>))}
      </div>
      <div>
     <div className="flex flex-wrap">
  {activeTab === "Post" &&
    post.userPost?.map(item => (
      <ReqUserPostCard key={item.id} post={item} />
    ))}

  {activeTab === "Saved" && isRequser &&
    user?.savePost?.map(item => (
      <ReqUserPostCard key={item.id} post={item} />
    ))}
</div>

      </div>
    </div >
  )
}
export default ReqUserPostPart