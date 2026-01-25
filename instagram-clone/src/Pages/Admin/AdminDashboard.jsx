import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Tabs, Typography, Paper } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import DashboardOverview from '../../Components/AdminComponents/DashboardOverview'
// Đảm bảo các đường dẫn này chính xác trong project của bạn
import PostAnalytics from '../../Components/AdminComponents/PostAnalytics'
import UserAnalytics from '../../Components/AdminComponents/UserAnalytics'
import LikeAnalytics from '../../Components/AdminComponents/LikeAnalytics'
import { getDashboardAnalytics } from '../../Redux/Admin/Action';
import UserManagement from '../../Components/AdminComponents/UserManagement';

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const  user  = useSelector((state) => state.user); 

  useEffect(() => {
    // Chỉ gọi API nếu chưa có dữ liệu hoặc muốn refresh (tùy logic của bạn)
    if (user.reqUser?.role?.role === 'ROLE_ADMIN') {
          const jwt = localStorage.getItem("token");
      dispatch(getDashboardAnalytics(jwt));
    }
  }, [dispatch, user.reqUser]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Check quyền Admin
  if (!user.reqUser || user.reqUser?.role?.role !== 'ROLE_ADMIN') {
    return (
      <Paper className="p-6 m-4 text-center">
        <Typography variant="h5" component="h1">
            {/* ĐÃ SỬA: Bỏ dấu $ để hiển thị đúng biến */}
            Role: {user.reqUser?.role?.role || "Guest"} <br/>
            You don't have permission to access this page.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box className="w-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Paper className="p-4 mb-4">
          <Typography variant="h4" component="h1" className="mb-4 font-bold text-gray-700">
            Admin Dashboard
          </Typography>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
            className="mb-2"
          >
            <Tab label="Dashboard" icon={<DashboardIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Post Analytics" icon={<ChatBubbleOutlineIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Like Analytics" icon={<ThumbUpIcon />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="User Analytics" icon={<PeopleIcon />} iconPosition="start" {...a11yProps(3)} />
            <Tab label="User Management" icon={<AdminPanelSettingsIcon />} iconPosition="start" {...a11yProps(4)} />
          </Tabs>
        </Paper>
      </Box>
      
      <TabPanel value={activeTab} index={0}>
        <DashboardOverview />
      </TabPanel>
      
      {/* Uncomment các phần dưới khi bạn đã sẵn sàng sử dụng component */}
      <TabPanel value={activeTab} index={1}>
        <PostAnalytics />
      </TabPanel>
      
      <TabPanel value={activeTab} index={2}>
        <LikeAnalytics />
      </TabPanel>
      
      <TabPanel value={activeTab} index={3}>
        <UserAnalytics />
      </TabPanel> 
      
    <TabPanel value={activeTab} index={4}>
        <UserManagement />
      </TabPanel> 
    </Box>
  );
};

export default AdminDashboard;