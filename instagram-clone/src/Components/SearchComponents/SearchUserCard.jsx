import { useNavigate } from "react-router-dom"

const SearchUserCard = ({user}) => {
  const navigate = useNavigate();

  return (
    <div 
   onClick={()=> navigate(`/profile/${user.username}`)} className="cursor-pointer py-2">
        <div className="flex items-center">
            <img className="w-12 h-12 rounded-full" src={user.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="" />
            <div className="ml-3">
                <p className="">{user.fullname}</p>
                <p className="opacity-70">{user.username}</p>
            </div>
        </div>
    </div>
  )
}

export default SearchUserCard