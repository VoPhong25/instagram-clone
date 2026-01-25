import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { ThumbUpAlt } from '@mui/icons-material';
import { getLikeAnalytics } from '../../Redux/Admin/Action';

// --- 1. STAT CARD (Thẻ số liệu) ---
const StatCard = ({ title, value, icon }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', // Căn giữa dọc
        justifyContent: 'space-between',
        height: '100%', 
        border: '1px solid #e0e0e0', 
        borderRadius: 2,
        bgcolor: '#fff'
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
          bgcolor: 'primary.light', 
          color: 'primary.main',
          display: 'flex'
      }}>
          {icon}
      </Box>
    </Paper>
  );
};

// --- 2. CHART CONTAINER (Khung chứa biểu đồ) ---
const ChartContainer = ({ title, children }) => (
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
        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
            {children}
        </Box>
    </Paper>
);

const LikeAnalytics = () => {
  const dispatch = useDispatch();
  const { likeAnalytics } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!likeAnalytics) {
       const jwt = localStorage.getItem("token")
       if(jwt) dispatch(getLikeAnalytics(jwt));
    }
  }, [dispatch, likeAnalytics]);

  const likesOverTimeData = useMemo(() => {
    if (!likeAnalytics?.likesOverTimeChart?.labels) return [];
    return likeAnalytics.likesOverTimeChart.labels.map((label, index) => ({
      name: label,
      [likeAnalytics.likesOverTimeChart.series[0]?.name || "Likes"]: 
        likeAnalytics.likesOverTimeChart.series[0]?.data[index] || 0
    }));
  }, [likeAnalytics]);

  const mostLikedPostsData = useMemo(() => {
    if (!likeAnalytics?.mostLikedPostsChart?.labels) return [];
    return likeAnalytics.mostLikedPostsChart.labels.map((label, index) => ({
      name: label,
      [likeAnalytics.mostLikedPostsChart.series[0]?.name || "Likes"]: 
        likeAnalytics.mostLikedPostsChart.series[0]?.data[index] || 0
    }));
  }, [likeAnalytics]);

  const mostActiveLikersData = useMemo(() => {
    if (!likeAnalytics?.mostActiveLikersChart?.labels) return [];
    return likeAnalytics.mostActiveLikersChart.labels.map((label, index) => ({
      name: label,
      [likeAnalytics.mostActiveLikersChart.series[0]?.name || "Count"]: 
        likeAnalytics.mostActiveLikersChart.series[0]?.data[index] || 0
    }));
  }, [likeAnalytics]);

  if (!likeAnalytics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: 1 }}> 
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 3
      }}>

        <Box sx={{ width: { xs: '100%', sm: '300px' } }}>
             <StatCard 
                title="Total Likes" 
                value={likeAnalytics.totalLikes} 
                icon={<ThumbUpAlt />} 
              />
        </Box>

        <Box sx={{ width: '100%', height: 400 }}>
            <ChartContainer title="Likes Activity Over Time">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={likesOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey={likeAnalytics.likesOverTimeChart?.series[0]?.name || "Likes"}
                            stroke="#8884d8"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>

        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 3,
            height: 450
        }}>
            <ChartContainer title="Most Liked Posts">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={mostLikedPostsData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar
                            dataKey={likeAnalytics.mostLikedPostsChart?.series[0]?.name || "Likes"}
                            fill="#8884d8"
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>

         
            <ChartContainer title="Most Active Likers">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={mostActiveLikersData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar
                            dataKey={likeAnalytics.mostActiveLikersChart?.series[0]?.name || "Count"}
                            fill="#82ca9d"
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>

      </Box>
    </Box>
  );
};

export default LikeAnalytics;