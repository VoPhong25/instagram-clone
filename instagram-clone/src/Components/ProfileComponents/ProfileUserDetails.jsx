import { TbCircleDashed } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../Redux/User/Action";

const ProfileUserDetails = ({ user, isRequser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const reqUser = useSelector((store) => store.user.reqUser);

  const isFollowing = reqUser?.following?.some(
    (u) => u.id === user?.id
  );

  if (!user) return null;

  const handleClick = () => {
    navigate(`/message/${user.id}`)
  }
  const handleChangePassword =() => {
   navigate("/account/change-password")}
  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-22 h-22 rounded-full object-cover"
            src={user.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
            alt=""
          />
        </div>

        <div className="space-y-3">
          <div className="flex space-x-6 items-center">
            <p className="font-bold text-xl">{user.username}</p>
            {isRequser ? (
              <button
                className="border bg-gray-200 px-3 py-1 rounded"
                onClick={() => navigate("/account/edit")}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button onClick={() =>
                  dispatch(
                    followUserAction({
                      jwt: token,
                      followUserId: user.id,
                    })
                  )
                }
                  className={`px-4 py-1 rounded cursor-pointer ${isFollowing ? "bg-gray-200" : "bg-blue-500 text-white"
                    }`}
                >
                  {isFollowing ? (
                    <span className="flex items-center gap-1">
                      Following <Check size={16} />
                    </span>
                  ) : (
                    <span>Follow  </span>
                  )}

                </button>

                {isFollowing && (
                  <button onClick={handleClick} className="border bg-gray-200 px-3 py-1 rounded">
                    Message
                  </button>
                )}
              </>
            )}

            <TbCircleDashed onClick={handleChangePassword} />
          </div>

          <p>{user.fullname}</p>

          <div className="flex space-x-10">
            <div><b>{user.posts?.length}</b> posts</div>
            <div><b>{user.followers?.length}</b> followers</div>
            <div><b>{user.following?.length}</b> following</div>
          </div>

          <p className="text-sm">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserDetails;
