import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

// Icon chung
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

// 1. IMPORT ICON ĐĂNG XUẤT (LOGOUT)
import { BiLogOut } from "react-icons/bi";

// Icon Admin
import { MdOutlineDashboard, MdDashboard } from "react-icons/md";

// Config
import { mainu } from "./SidebarConfig"; 
import CreatePostModal from "../Posts/CreatePostModal.jsx";
import SearchComponents from "../SearchComponents/SearchComponents.jsx";
import { logoutAction } from "../../Redux/User/Action.js";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const isCollapsed = activeTab === "Search" || activeTab === "Message";

  // --- SỬA LẠI ĐOẠN NÀY CHO ĐÚNG CÚ PHÁP ---
  const isAdmin = user.reqUser?.role?.role === "ROLE_ADMIN";
  
  const menuItems = isAdmin
    ? [
        ...mainu,
        {
          title: "Admin",
          icon: <MdOutlineDashboard className="text-2xl mr-5" />,
          activeIcon: <MdDashboard className="text-2xl mr-5" />,
        },
      ]
    : mainu;
  // ------------------------------------------

  // 2. HÀM XỬ LÝ ĐĂNG XUẤT
  const handleLogout = () => {
    dispatch(logoutAction()); 
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  const handleTabClick = (title) => {
    setActiveTab(title);
    switch (title) {
      case "Home":
        navigate(`/${user.reqUser?.username}`);
        setIsSearchVisible(false);
        break;
      case "Profile":
        navigate(`/profile/${user.reqUser?.username}`);
        setIsSearchVisible(false);
        break;
      case "Create":
        setIsSearchVisible(false);
        onOpen();
        break;
      case "Search":
        setIsSearchVisible(true);
        break;
      case "Message":
        navigate("/message");
        setIsSearchVisible(false);
        break;
      case "Admin":
        navigate("/adminDashboard");
        setIsSearchVisible(false);
        break;
      default:
        setIsSearchVisible(false);
        break;
    }
  };

  useEffect(() => {
    // Guard clause: Nếu không có user thì return ngay để tránh vòng lặp vô tận
    if (!user.reqUser) return;

    const path = location.pathname;
    if (path.startsWith("/profile")) { setActiveTab("Profile"); setIsSearchVisible(false); return; }
    if (path === "/" || path === `/${user.reqUser?.username}`) { setActiveTab("Home"); setIsSearchVisible(false); return; }
    if (path.startsWith("/message")) { setActiveTab("Message"); setIsSearchVisible(false); return; }
    if (path.startsWith("/adminDashboard")) { setActiveTab("Admin"); setIsSearchVisible(false); return; }
  }, [location.pathname, user.reqUser?.username]);

  return (
    <div className="sticky top-0 h-screen flex">
      <div
        className={`flex flex-col justify-between h-full transition-all duration-300 ${
          isCollapsed ? "px-2 w-[80px]" : "px-10 w-[260px]"
        }`}
      >
        {/* --- PHẦN TRÊN (LOGO + MENU) --- */}
        <div>
          {isCollapsed ? (
            <FaInstagram className="text-2xl mt-10 mb-10" />
          ) : (
            <div className="pt-10">
              <img className="w-40" src="https://i.imgur.com/zqpwkLQ.png" alt="logo" />
            </div>
          )}

          <div className="mt-10">
            {menuItems.map((item) => (
              <div
                key={item.title}
                onClick={() => handleTabClick(item.title)}
                className="flex items-center gap-4 mb-5 cursor-pointer text-lg"
              >
                {activeTab === item.title ? item.activeIcon : item.icon}
                {!isCollapsed && (
                  <p className={`${activeTab === item.title ? "font-bold" : "font-semibold"}`}>
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- PHẦN DƯỚI (MORE + LOGOUT) --- */}
        <div className={`flex pb-10 cursor-pointer ${
            isCollapsed 
            ? "flex-col items-center gap-6" 
            : "flex-row items-center justify-between"
        }`}>
          
          {/* Nút More */}
          <div className="flex items-center gap-4 hover:opacity-70 transition-opacity">
            <IoReorderThreeOutline className="text-2xl" />
            {!isCollapsed && <p className="font-semibold">More</p>}
          </div>

          {/* Nút Đăng xuất */}
          <div 
            onClick={handleLogout}
            className="flex items-center justify-center hover:bg-gray-100 p-2 rounded-full transition-all text-red-500"
            title="Đăng xuất"
          >
            <BiLogOut className="text-2xl" />
          </div>

        </div>
      </div>

      <CreatePostModal isOpen={isOpen} onClose={onClose} />
      {isSearchVisible && <SearchComponents />}
    </div>
  );
};

export default Sidebar;