import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            欢迎来到我的个人网站
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Typography variant="h5" color="textSecondary" align="center" sx={{ mb: 4 }}>
            资讯工程研究生 | 软体开发者
          </Typography>
        </motion.div>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          elevation={3}
          sx={{ p: 4, maxWidth: 600, width: '100%', mb: 4 }}
        >
          <Typography variant="body1" paragraph>
            目前就读于国立台北大学资讯工程研究所二年级，专注于计算机科学领域的研究与实践。
            拥有扎实的程式设计基础，热衷于探索新技术，期待能够为科技发展贡献一份力量。
          </Typography>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/education')}
            sx={{ mr: 2 }}
          >
            查看教育背景
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/contact')}
          >
            联系我
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 