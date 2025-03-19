import React from 'react';
import { Container, Typography, Paper, Box, Button, Avatar, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import profileImage from '../assets/images/profile.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { language } = useLanguage();

  const handleDownloadResume = () => {
    navigate('/resume?download=true');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'relative' }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              right: -8,
              bottom: -8,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(156, 129, 100, 0.2) 0%, rgba(182, 159, 140, 0.4) 50%, rgba(124, 99, 69, 0.2) 100%)',
              filter: 'blur(8px)',
              zIndex: 0,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Avatar
            src={profileImage}
            alt={language === 'en' ? 'Yu-Chen Hsu' : '許育宸'}
            sx={{
              width: { xs: 150, sm: 180 },
              height: { xs: 150, sm: 180 },
              mb: { xs: 3, sm: 4 },
              border: '4px solid rgba(255, 255, 255, 0.9)',
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#fff',
              boxShadow: theme => `0 8px 24px ${theme.palette.primary.main}15`,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant={isMobile ? "h3" : "h2"}
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontWeight: 300,
              color: 'primary.main',
              letterSpacing: 2,
            }}
          >
            {language === 'en' ? 'Yu-Chen Hsu' : '許育宸'}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"}
            color="text.secondary" 
            align="center" 
            sx={{ 
              mb: { xs: 3, sm: 4 },
              fontWeight: 300,
              letterSpacing: 1,
              px: { xs: 2, sm: 0 },
            }}
          >
            {language === 'en' 
              ? 'Graduate Student in Computer Science | Software Developer' 
              : '資訊工程研究生 | 軟體開發者'}
          </Typography>
        </motion.div>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          elevation={0}
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            maxWidth: 800, 
            width: '100%', 
            mb: { xs: 3, sm: 4 },
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
            border: '1px solid',
            borderColor: 'primary.light',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              color: 'text.primary',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            {language === 'en' 
              ? "Currently a second-year graduate student at National Taipei University's Department of Computer Science and Information Engineering. With a solid foundation in programming, I am passionate about exploring new technologies and eager to contribute to technological advancement. My research focuses on Natural Language Processing (NLP), particularly in the application and optimization of Large Language Models (LLM) and Automatic Speech Recognition (ASR) technologies."
              : '目前就讀於國立臺北大學資訊工程研究所二年級，擁有紮實的程式設計基礎，熱衷於探索新技術，期待能夠為科技發展貢獻一份力量。目前研究專注於自然語言處理（Natural Language Processing）領域，特別是大型語言模型（LLM）和自動語音辨識（ASR）技術的應用與優化。'}
          </Typography>
        </Paper>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2 }, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            px: { xs: 1, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            onClick={() => navigate('/education')}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 2,
              },
              flex: { xs: '1 1 calc(50% - 0.75rem)', sm: '0 0 auto' },
            }}
          >
            {language === 'en' ? 'Education' : '學歷'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            onClick={() => navigate('/projects')}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 2,
              },
              flex: { xs: '1 1 calc(50% - 0.75rem)', sm: '0 0 auto' },
            }}
          >
            {language === 'en' ? 'Projects' : '專案'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size={isMobile ? "medium" : "large"}
            onClick={handleDownloadResume}
            startIcon={<DownloadIcon />}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
              flex: { xs: '1 1 calc(50% - 0.75rem)', sm: '0 0 auto' },
            }}
          >
            {language === 'en' ? 'Download CV' : '下載履歷'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size={isMobile ? "medium" : "large"}
            onClick={() => navigate('/contact')}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
              flex: { xs: '1 1 calc(50% - 0.75rem)', sm: '0 0 auto' },
            }}
          >
            {language === 'en' ? 'Contact' : '聯絡我'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 