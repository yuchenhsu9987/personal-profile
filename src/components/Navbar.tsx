import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          个人简介
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            首页
          </Button>
          <Button color="inherit" onClick={() => navigate('/education')}>
            教育背景
          </Button>
          <Button color="inherit" onClick={() => navigate('/skills')}>
            技能
          </Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>
            联系方式
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 