import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress,
  Avatar,
  Chip
} from '@mui/material';
import { Search, Block, CheckCircleOutline } from '@mui/icons-material';
import { banUser, getAllUsers, unbanUser } from '../../Redux/Admin/Action';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.admin);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog States
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openUnbanDialog, setOpenUnbanDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState('');

  // Lấy token từ localStorage
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    if (jwt) {
      dispatch(getAllUsers(jwt, searchQuery, page, rowsPerPage));
    }
  }, [dispatch, jwt, page, rowsPerPage, searchQuery]);

  // --- Handlers Pagination ---
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // --- Handlers Search ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (jwt) {
      dispatch(getAllUsers(jwt, searchQuery, 0, rowsPerPage));
    }
    setPage(0);
  };

  // --- Handlers Dialog ---
  const handleOpenBanDialog = (user) => {
    setSelectedUser(user);
    setOpenBanDialog(true);
  };

  const handleOpenUnbanDialog = (user) => {
    setSelectedUser(user);
    setOpenUnbanDialog(true);
  };

  const handleCloseBanDialog = () => {
    setOpenBanDialog(false);
    setSelectedUser(null);
    setBanReason('');
  };

  const handleCloseUnbanDialog = () => {
    setOpenUnbanDialog(false);
    setSelectedUser(null);
  };

  const handleBanUser = async () => {
    if (!selectedUser || !jwt) return;

    const reqData = {
        userId: selectedUser.id,
        jwt: jwt,
        data: { reason: `${banReason}` } 
    };

    try {
      await dispatch(banUser(reqData));

      handleCloseBanDialog();
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnbanUser = async () => {
    if (!selectedUser || !jwt) return;

    const reqData = {
        userId: selectedUser.id,
        jwt: jwt
    };

    try {
      await dispatch(unbanUser(reqData));
      handleCloseUnbanDialog();
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  const isUserBanned = (user) => {
    if (user.verification?.status === false || user.verification?.planType?.startsWith("BANNED")) {
      return true;
    }
    return false;
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper sx={{ width: '100%', mb: 2, p: 3, boxShadow: '0px 2px 10px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
          User Management
        </Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or email"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ bgcolor: '#f9f9f9' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary" 
            sx={{ px: 4, fontWeight: 'bold' }}
          >
            SEARCH
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Joined Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#666' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#666' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading.allUsers && users.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={6} align="center"><CircularProgress /></TableCell>
                 </TableRow>
              ) : (
                users.map((user) => {
                  const banned = isUserBanned(user);
                  return (
                    <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.image} alt={user.fullname} sx={{ mr: 2, bgcolor: '#bdbdbd' }}>
                                {user.fullname ? user.fullname[0].toUpperCase() : 'U'}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>
                                {user.fullname}
                            </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{user.email}</TableCell>

         
                      <TableCell sx={{ color: '#888' }}>
                          {user.location || 'Not specified'}
                      </TableCell>

                      <TableCell>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </TableCell>

                      <TableCell>
                        {banned ? (
                          <Chip label="Banned" color="error" size="small" sx={{ fontWeight: 'bold', borderRadius: '4px' }} />
                        ) : (
                          <Chip label="Active" color="success" size="small" sx={{ fontWeight: 'bold', borderRadius: '16px', bgcolor: '#4caf50', color: '#fff' }} />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {banned ? (
                          <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            startIcon={<CheckCircleOutline />}
                            onClick={() => handleOpenUnbanDialog(user)}
                            sx={{ fontWeight: 'bold' }}
                          >
                            UNBAN
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<Block />}
                            onClick={() => handleOpenBanDialog(user)}
                            sx={{ fontWeight: 'bold', borderColor: '#d32f2f', color: '#d32f2f' }}
                          >
                            BAN
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
              {!loading.allUsers && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={-1} 
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to }) => `${from}-${to} of more than ${to}`}
        />
      </Paper>

      <Dialog open={openBanDialog} onClose={handleCloseBanDialog}>
        <DialogTitle>Ban User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to ban <b>{selectedUser?.fullname}</b>? This will restrict their access to post content.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for ban"
            type="text"
            fullWidth
            variant="outlined"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBanDialog}>Cancel</Button>
          <Button 
            onClick={handleBanUser} 
            color="error" 
            variant="contained"
            disabled={!banReason.trim()}
          >
            Ban User
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUnbanDialog} onClose={handleCloseUnbanDialog}>
        <DialogTitle>Unban User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unban <b>{selectedUser?.fullname}</b>? They will be able to access the system again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUnbanDialog}>Cancel</Button>
          <Button 
            onClick={handleUnbanUser} 
            color="success"
            variant="contained"
          >
            Unban User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;