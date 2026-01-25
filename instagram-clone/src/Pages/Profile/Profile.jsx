import { useParams } from "react-router-dom";
import ProfileUserDetails from "../../Components/ProfileComponents/ProfileUserDetails"
import ReqUserPostPart from "../../Components/ProfileComponents/ReqUserPostPart"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { findUserByUsernameAction, getUserProfileAction } from "../../Redux/User/Action";
import { isReqUser } from "../../Config/Logic";


const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const { username } = useParams();
  const user = useSelector(store => store.user)

  const isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id)
  const isFollowed = user.findByUsername?.followed;
  console.log("isFollow ", isFollowed)

  useEffect(() => {
    const data = {
      jwt: token,
      username: username
    }
    dispatch(getUserProfileAction(token))
    dispatch(findUserByUsernameAction(data))
  }, [username, user.followUser])

  return (
    <div className="px-10">
      <div>
        <ProfileUserDetails user={isRequser ? user.reqUser : user.findByUsername} isRequser={isRequser} />
      </div>
      <div>
        <ReqUserPostPart
          user={isRequser ? user.reqUser : user.findByUsername}
          isRequser={isRequser}
        />

      </div>
    </div>
  )
}

export default Profile