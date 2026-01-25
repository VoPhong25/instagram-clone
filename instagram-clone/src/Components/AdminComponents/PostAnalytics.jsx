import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  ChatBubbleOutline, 
  BookmarkBorder, 
  CommentOutlined 
} from '@mui/icons-material';
import { getPostAnalytics } from '../../Redux/Admin/Action';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '100%', border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fff',
        transition: '0.3s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)', borderColor: '#b0bec5' }
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{value?.toLocaleString() || 0}</Typography>
      </Box>
      <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main', display: 'flex', opacity: 0.9 }}>
          {icon}
      </Box>
    </Paper>
  );
};

// --- ĐÃ SỬA COMPONENT NÀY ĐỂ FIX LỖI MẤT HÌNH ---
const ChartContainer = ({ title, children, height = 350 }) => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, border: '1px solid #e0e0e0', borderRadius: 2, height: '100%',
        bgcolor: '#fff', display: 'flex', flexDirection: 'column'
      }}
    >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}>{title}</Typography>
        {/* Dùng div thường thay vì Box Flexbox để Recharts tính được chiều cao */}
        <div style={{ width: '100%', height: height }}>
            {children}
        </div>
    </Paper>
);

const PostAnalytics = () => {
  const dispatch = useDispatch();
  const { postAnalytics } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!postAnalytics) {
        const jwt = localStorage.getItem("token");
        if(jwt) dispatch(getPostAnalytics(jwt));
    }
  }, [dispatch, postAnalytics]);

  const postsOverTimeData = useMemo(() => {
    if (!postAnalytics?.postsOverTimeChart?.labels) return [];
    return postAnalytics.postsOverTimeChart.labels.map((label, index) => {
      const dataPoint = { name: label };
      postAnalytics.postsOverTimeChart.series.forEach(serie => {
         dataPoint[serie.name] = serie.data[index] || 0;
      });
      return dataPoint;
    });
  }, [postAnalytics]);

  const topPostersData = useMemo(() => {
    if (!postAnalytics?.topPostersChart?.labels) return [];
    return postAnalytics.topPostersChart.labels.map((label, index) => ({
      name: label,
      [postAnalytics.topPostersChart.series[0]?.name || "Count"]: 
        postAnalytics.topPostersChart.series[0]?.data[index] || 0
    }));
  }, [postAnalytics]);

  if (!postAnalytics) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  const seriesNames = postAnalytics.postsOverTimeChart?.series.map(s => s.name) || [];

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <StatCard title="Total Posts" value={postAnalytics.totalPosts} icon={<ChatBubbleOutline />} />
            <StatCard title="Total Saves" value={postAnalytics.totalSaves} icon={<BookmarkBorder />} />
            <StatCard title="Total Comments" value={postAnalytics.totalComments} icon={<CommentOutlined />} />
        </Box>

        <Box sx={{ width: '100%' }}>
            <ChartContainer title="Activity Over Time" height={350}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={postsOverTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                        {seriesNames.map((name, index) => (
                            <Line
                                key={name} type="monotone" dataKey={name}
                                stroke={COLORS[index % COLORS.length]} strokeWidth={3}
                                activeDot={{ r: 8 }} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>

        <Box sx={{ width: '100%' }}>
            <ChartContainer title="Top Posters" height={300}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPostersData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                        <XAxis type="number" axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar
                            dataKey={postAnalytics.topPostersChart?.series[0]?.name || "Count"}
                            fill="#8884d8" radius={[0, 4, 4, 0]} barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PostAnalytics;