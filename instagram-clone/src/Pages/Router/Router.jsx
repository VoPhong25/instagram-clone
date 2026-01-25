
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import Profile from '../Profile/Profile'
import Story from '../Story/Story'
import PrivateRoute from './PrivateRouter'
import EditAccountDetails from '../../Components/EditAccount/EditAccountDetails'
import Message from '../Message/Message'
import AdminDashboard from '../Admin/AdminDashBoard';
import MuiProvider from '../../MuiProvider';
import Auth from './Auth'
import ChangePassword from '../../Components/EditAccount/ChangePassword'

const Router = () => {
  const location = useLocation();
  const isMessagePage = location.pathname.startsWith("/message");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgotpassword";

  return (
    <div>
      {!isAuthPage && (
        <div className="flex">
          <aside
            className={`
              shrink-0
              transition-all duration-300
              ${isMessagePage ? "w-[60px]" : "w-80 xl:w-96"} 
              ${isMessagePage ? "" : "border-r border-slate-200"}
            `}
          >
            <Sidebar />
          </aside>

          <main
            className={`
              flex-1 min-w-0
              ${isMessagePage ? "pl-0" : "pl-8"}
            `}
          >
            <Routes>
              <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/adminDashboard" element={<PrivateRoute><MuiProvider><AdminDashboard /></MuiProvider></PrivateRoute>} />
              <Route path="/profile/:username" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/account/edit" element={<PrivateRoute><EditAccountDetails /></PrivateRoute>} />
              <Route path="/story/:userId" element={<PrivateRoute><Story /></PrivateRoute>} />
              <Route path="/message" element={<PrivateRoute><Message /></PrivateRoute>} />
              <Route path="/message/:userId" element={<PrivateRoute><Message /></PrivateRoute>} />
              <Route path="/comment/:postId" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/:username" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/account/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      )}

      {isAuthPage && (
        <div>
          <Routes>
            <Route path="/signup" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/forgotpassword" element={<Auth />} />
          </Routes>
        </div>
      )}
    </div>
  )
}
export default Router;