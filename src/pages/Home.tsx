import React from 'react';
import { Container, Typography, Paper, Box, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import profileImage from '../assets/images/profile.png';
import resume from '../assets/documents/resume.pdf';

const Home = () => {
  const navigate = useNavigate();

  const handleDownloadResume = () => {
    window.open(resume, '_blank');
  };

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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            src={profileImage}
            alt="個人照片"
            sx={{
              width: 200,
              height: 200,
              mb: 4,
              border: '4px solid #1976d2',
              boxShadow: 3,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom align="center">
            許育辰
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Typography variant="h5" color="textSecondary" align="center" sx={{ mb: 4 }}>
            資訊工程研究生 | 軟體開發者
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
            目前就讀於國立臺北大學資訊工程研究所二年級，專注於電腦科學領域的研究與實務。
            擁有紮實的程式設計基礎，熱衷於探索新技術，期待能夠為科技發展貢獻一份力量。
          </Typography>
          <Typography variant="body1">
            研究方向包括機器學習、深度學習和電腦視覺，並具有實際的專案開發經驗。
            在學術研究和實務應用之間，我追求理論與實踐的完美結合。
          </Typography>
        </Paper>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/education')}
          >
            學歷背景
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleDownloadResume}
            startIcon={<DownloadIcon />}
          >
            下載履歷
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/contact')}
          >
            聯絡我
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 