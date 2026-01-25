import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress } from '@mui/material'; // Bỏ Grid
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  PeopleOutline, 
  ChatBubbleOutline, 
  ThumbUpAlt, 
  BookmarkBorder, 
  CommentOutlined 
} from '@mui/icons-material';

const CHART_COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
const StatCard = ({ title, value, icon, iconColor }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        border: '1px solid #e0e0e0', 
        borderRadius: 2,
      
        transition: 'all 0.3s',
        '&:hover': {
           boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
           transform: 'translateY(-2px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
          {title}
        </Typography>
        <Box sx={{ color: iconColor || 'text.secondary', p: 1, borderRadius: '50%', bgcolor: '#f5f5f5' }}>
            {icon}
        </Box>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, color: '#333' }}>
        {value?.toLocaleString() || 0}
      </Typography>
    </Paper>
  );
};

const DashboardOverview = () => {
  const { dashboard } = useSelector((state) => state.admin);

  const userGrowthData = useMemo(() => {
    if (!dashboard?.userGrowthChart) return [];
    return dashboard.userGrowthChart.labels.map((label, index) => ({
      name: label,
      users: dashboard.userGrowthChart.series[0]?.data[index] || 0
    }));
  }, [dashboard]);

  const activityData = useMemo(() => {
    if (!dashboard?.activityChart) return [];
    return dashboard.activityChart.labels.map((label, index) => {
      const item = { name: label };
      dashboard.activityChart.series.forEach((serie) => {
        item[serie.name] = serie.data[index] || 0;
      });
      return item;
    });
  }, [dashboard]);

  if (!dashboard) {
    return (
      <Box sx={{ p: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
         <CircularProgress />
      </Box>
    );
  }

  return (
    // Sử dụng width 100% để tránh bị bóp méo
    <Box sx={{ width: '100%', p: 1 }}> 
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',     
          sm: '1fr 1fr',   
          md: '1fr 1fr 1fr' 
        },
        gap: 3, 
        mb: 4   
      }}>
          <StatCard 
            title="Total Users" 
            value={dashboard.totalUsers} 
            icon={<PeopleOutline />} 
          />
          <StatCard 
            title="New Users" 
            value={dashboard.newUsers} 
            icon={<PeopleOutline sx={{ color: '#9c27b0' }} />} 
          />
          <StatCard 
            title="Total Posts" 
            value={dashboard.totalPosts} 
            icon={<ChatBubbleOutline />} 
          />
          <StatCard 
            title="Total Likes" 
            value={dashboard.totalLikes} 
            icon={<ThumbUpAlt />} 
          />
          <StatCard 
            title="Total Saves" 
            value={dashboard.totalSaves} 
            icon={<BookmarkBorder />} 
          />
          <StatCard 
            title="Total Comments" 
            value={dashboard.totalComments} 
            icon={<CommentOutlined />} 
          />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              User Growth
            </Typography>
            <div style={{ width: '100%', height: 350 }}> 
                <ResponsiveContainer>
                <LineChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="users"
                      name="New Users"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>
        </Paper>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Platform Activity
            </Typography>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                <BarChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    {dashboard.activityChart?.series?.map((serie, index) => (
                    <Bar
                        key={serie.name}
                        dataKey={serie.name}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        radius={[4, 4, 0, 0]} 
                        barSize={40} 
                    />
                    ))}
                </BarChart>
                </ResponsiveContainer>
            </div>
        </Paper>

      </Box>
    </Box>
  );
};

export default DashboardOverview;