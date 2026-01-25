import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  PeopleOutline,   
  PersonAddAlt1,     
  DirectionsRun     
} from '@mui/icons-material';
import { getUserAnalytics } from '../../Redux/Admin/Action';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        height: '100%', 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        bgcolor: '#fff',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            borderColor: '#b0bec5'
        }
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          {value?.toLocaleString() || 0}
        </Typography>
      </Box>
      <Box sx={{ 
          p: 1.5, 
          borderRadius: '50%', 
          bgcolor: `${color}.light`, 
          color: `${color}.main`,
          display: 'flex',
          opacity: 0.9
      }}>
          {icon}
      </Box>
    </Paper>
  );
};

const ChartContainer = ({ title, children, height = 350 }) => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        border: '1px solid #e0e0e0', 
        borderRadius: 2,
        height: '100%',
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}>
            {title}
        </Typography>
        <div style={{ width: '100%', height: height, minHeight: 250 }}>
            {children}
        </div>
    </Paper>
);

const UserAnalytics = () => {
  const dispatch = useDispatch();
  const { userAnalytics } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!userAnalytics) {
        const jwt = localStorage.getItem("token");
        if(jwt) dispatch(getUserAnalytics(jwt));
    }
  }, [dispatch, userAnalytics]);

  const userGrowthData = useMemo(() => {
    if (!userAnalytics?.userGrowthChart?.labels) return [];
    return userAnalytics.userGrowthChart.labels.map((label, index) => ({
      name: label,
      [userAnalytics.userGrowthChart.series[0]?.name || "New Users"]: 
        userAnalytics.userGrowthChart.series[0]?.data[index] || 0
    }));
  }, [userAnalytics]);

  const mostFollowedUsersData = useMemo(() => {
    if (!userAnalytics?.mostFollowedUsersChart?.labels) return [];
    return userAnalytics.mostFollowedUsersChart.labels.map((label, index) => ({
      name: label,
      [userAnalytics.mostFollowedUsersChart.series[0]?.name || "Followers"]: 
        userAnalytics.mostFollowedUsersChart.series[0]?.data[index] || 0
    }));
  }, [userAnalytics]);

  // Loading State
  if (!userAnalytics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, 
            gap: 3 
        }}>
            <StatCard 
                title="Total Users" 
                value={userAnalytics.totalUsers} 
                icon={<PeopleOutline />} 
                color="primary"
            />
            <StatCard 
                title="New Users" 
                value={userAnalytics.newUsers} 
                icon={<PersonAddAlt1 />} 
                color="secondary"
            />
            <StatCard 
                title="Active Users" 
                value={userAnalytics.activeUsers} 
                icon={<DirectionsRun />} 
                color="success"
            />
        </Box>

        <Box sx={{ width: '100%' }}>
            <ChartContainer title="User Growth">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Line
                            type="monotone"
                            dataKey={userAnalytics.userGrowthChart?.series[0]?.name || "New Users"}
                             stroke="#82ca9d"// Màu tím
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>

        <Box sx={{ width: '100%' }}>
            <ChartContainer title="Most Followed Users" height={350}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={mostFollowedUsersData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar
                            dataKey={userAnalytics.mostFollowedUsersChart?.series[0]?.name || "Followers"}
                            fill="#8884d8"
                            radius={[0, 4, 4, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>

      </Box>
    </Box>
  );
};

export default UserAnalytics;