import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          個人簡介
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            首頁
          </Button>
          <Button color="inherit" onClick={() => navigate('/education')}>
            學歷背景
          </Button>
          <Button color="inherit" onClick={() => navigate('/skills')}>
            專業技能
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            聯絡方式
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 