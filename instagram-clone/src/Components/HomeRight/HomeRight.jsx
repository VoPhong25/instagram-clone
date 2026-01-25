import { useDispatch, useSelector } from "react-redux";
import SuggetionCard from "./SuggetionCard"

const HomeRight = () => {

const user = useSelector(store => store.user);
const post = useSelector(store => store.post);
console.log("popular:  ", user)

  return (
    <div className="">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div>
              <img className="w-12 h-12 rounded-full" src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="" />
            </div>
            <div className="ml-2">
              <p className="font-semibold">{user.reqUser?.username}</p>
              <p className="opacity-60">{user.reqUser?.fullname}</p>
            </div>
          </div>
          <div>
            <p className='text-sm font-semibold text-blue-700 '>Switch</p>
          </div>
        </div>
      <div className="space-y-5 mt-10">
            {user.popularUsers?.map((item) => <SuggetionCard key={item.id || index} user={item}/>)}
      </div>
      </div>
    </div>
  )
}

export default HomeRight