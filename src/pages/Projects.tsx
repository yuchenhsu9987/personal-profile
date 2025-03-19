import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';
import { useLanguage } from '../contexts/LanguageContext';

const projectsList = [
  {
    titleEn: 'LLM Chat-Bot',
    titleZh: 'LLM 聊天机器人',
    descriptionEn: 'An intelligent chatbot developed based on large language models. Integrates advanced natural language processing technology, supports multi-turn dialogue, and has contextual understanding capabilities. Developed using React for the frontend interface and deployed with Firebase for a smooth user experience.',
    descriptionZh: '基于大型语言模型开发的智能对话机器人。整合了先进的自然语言处理技术，支持多轮对话，并具有上下文理解能力。使用 React 开发前端界面，Firebase 进行部署，提供流畅的用户体验。',
    link: 'https://chat-bot-39815.web.app/',
    technologies: ['React', 'Firebase', 'LLM', 'Natural Language Processing', 'TypeScript']
  },
  {
    titleEn: 'Crypto Tracker',
    titleZh: '加密货币追踪器',
    descriptionEn: 'A cryptocurrency tracking application developed with React and Firebase. Provides real-time price updates, market trend analysis, and allows users to bookmark their favorite cryptocurrencies. Features responsive design and supports real-time data display for multiple cryptocurrencies.',
    descriptionZh: '使用 React 和 Firebase 开发的加密货币追踪应用。提供即时价格更新、市场趋势分析，并支持用户收藏喜爱的加密货币。具有响应式设计，支持多种加密货币的实时数据展示。',
    link: 'https://crypto-dba3b.web.app/',
    technologies: ['React', 'Firebase', 'API Integration', 'Material-UI', 'Responsive Design']
  },
  {
    titleEn: 'Selective Mutism Model Testing and Recording System',
    titleZh: '选择性缄默症模型测试与收音系统',
    descriptionEn: 'Developed a specialized platform for collecting and testing voice samples from selective mutism patients. This system can collect voice samples and conduct real-time testing, providing important data support for research.',
    descriptionZh: '开发一个专门针对选择性缄默症患者的语音收集和测试平台。此系统能够收集语音样本并进行即时测试，为研究提供重要的数据支持。',
    link: 'https://120.126.151.159:56432/',
    technologies: ['Python', 'React', 'Speech Recognition', 'Deep Learning']
  },
  {
    titleEn: 'Selective Mutism Model Data Analysis Platform',
    titleZh: '选择性缄默症模型数据分析平台',
    descriptionEn: 'Established a data analysis platform for analyzing and visualizing selective mutism speech recognition results. This platform helps research teams better understand model performance and improvement directions.',
    descriptionZh: '建立数据分析平台，用于分析和可视化选择性缄默症语音识别的结果。此平台协助研究团队更好地理解模型表现和改进方向。',
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
            {language === 'en' ? 'View Project' : '查看项目'}
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
        {language === 'en' ? 'Projects' : '项目作品'}
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