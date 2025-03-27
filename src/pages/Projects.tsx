import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';
import { useLanguage } from '../contexts/LanguageContext';

const projectsList = [
  {
    titleEn: 'Ask About Me',
    titleZh: '履歷互動',
    descriptionEn: 'A cross-platform application built with React and TypeScript that integrates OpenAI API to provide intelligent Q&A functionality, allowing users to ask AI questions about me.',
    descriptionZh: '這是一個基於 React 和 TypeScript 的跨平台應用，整合 OpenAI API 來提供智慧問答功能，讓使用者能夠向 AI 詢問一些關於我的問題。',
    link: 'https://ask-aboutme.firebaseapp.com/',
    technologies: ['React', 'TypeScript', 'OpenAI API', 'Firebase', 'Material-UI']
  },
  {
    titleEn: 'LLM Chat-Bot',
    titleZh: 'LLM 聊天機器人',
    descriptionEn: 'An intelligent chatbot developed based on large language models. Integrates advanced natural language processing technology, supports multi-turn dialogue, and has contextual understanding capabilities. Developed using React for the frontend interface and deployed with Firebase for a smooth user experience.',
    descriptionZh: '基於大型語言模型開發的智能對話機器人。整合了先進的自然語言處理技術，支援多輪對話，並具有上下文理解能力。使用 React 開發前端介面，Firebase 進行部署，提供流暢的使用者體驗。',
    link: 'https://chat-bot-39815.web.app/',
    technologies: ['React', 'Firebase', 'LLM', 'Natural Language Processing', 'TypeScript']
  },
  {
    titleEn: 'Crypto Tracker',
    titleZh: '加密貨幣追蹤器',
    descriptionEn: 'A cryptocurrency tracking application developed with React and Firebase. Provides real-time price updates, market trend analysis, and allows users to bookmark their favorite cryptocurrencies. Features responsive design and supports real-time data display for multiple cryptocurrencies.',
    descriptionZh: '使用 React 和 Firebase 開發的加密貨幣追蹤應用。提供即時價格更新、市場趨勢分析，並支援使用者收藏喜愛的加密貨幣。具有響應式設計，支援多種加密貨幣的即時數據展示。',
    link: 'https://crypto-dba3b.web.app/',
    technologies: ['React', 'Firebase', 'API Integration', 'Material-UI', 'Responsive Design']
  },
  {
    titleEn: 'Selective Mutism Model Testing and Recording System',
    titleZh: '吶語症模型測試與收音系統',
    descriptionEn: 'Developed a specialized platform for collecting and testing voice samples from selective mutism patients. This system can collect voice samples and conduct real-time testing, providing important data support for research.',
    descriptionZh: '開發一個專門針對吶語症患者的語音收集和測試平台。此系統能夠收集語音樣本並進行即時測試，為研究提供重要的數據支援。',
    link: 'https://120.126.151.159:56432/',
    technologies: ['Python', 'React', 'Speech Recognition', 'Deep Learning']
  },
  {
    titleEn: 'Selective Mutism Model Data Analysis Platform',
    titleZh: '吶語症模型數據分析平台',
    descriptionEn: 'Established a data analysis platform for analyzing and visualizing selective mutism speech recognition results. This platform helps research teams better understand model performance and improvement directions.',
    descriptionZh: '建立數據分析平台，用於分析和視覺化吶語症語音識別的結果。此平台協助研究團隊更好地理解模型表現和改進方向。',
    link: 'https://dmcair.ntpu.edu.tw:5173/',
    technologies: ['Data Analysis', 'Visualization', 'React', 'Python']
  }
];

const ProjectCard = ({ project, index }: { project: typeof projectsList[0]; index: number }) => {
  const { language } = useLanguage();
  
  return (
    <Grid item xs={12} md={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom component="h2">
            {language === 'en' ? project.titleEn : project.titleZh}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
            {language === 'en' ? project.descriptionEn : project.descriptionZh}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {project.technologies.map((tech) => (
              <Typography
                key={tech}
                variant="body2"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.8rem'
                }}
              >
                {tech}
              </Typography>
            ))}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<LaunchIcon />}
            component={Link}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {language === 'en' ? 'View Project' : '查看專案'}
          </Button>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const Projects = () => {
  const { language } = useLanguage();
  
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {language === 'en' ? 'Projects' : '專案作品'}
      </Typography>
      
      <Grid container spacing={3}>
        {projectsList.map((project, index) => (
          <ProjectCard key={language === 'en' ? project.titleEn : project.titleZh} project={project} index={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default Projects; 