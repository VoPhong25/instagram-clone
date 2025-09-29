
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import Profile from '../Profile/Profile'

const Router = () => {
  return (
    <div>
    <div className="flex">
      {/* Sidebar cố định độ rộng, không co; vạch ngăn ở MÉP PHẢI */}
      <aside className="w-70 shrink-0 border-r border-slate-200">
        <Sidebar />
      </aside>

      {/* Main chiếm phần còn lại */}
      <main className="flex-1 min-w-0 pl-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/username" element={<Profile />} />
        </Routes>
      </main>
    </div>
    </div>
  )
}
export default Router
