import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import LaunchIcon from '@mui/icons-material/Launch';

const projectsList = [
  {
    title: '吶語症模型測試與收音系統',
    description: '開發一個專門針對吶語症患者的語音收集和測試平台。此系統能夠收集語音樣本並進行即時測試，為研究提供重要的數據支持。',
    link: 'https://120.126.151.159:56432/',
    technologies: ['Python', 'React', 'Speech Recognition', 'Deep Learning']
  },
  {
    title: '吶語症模型數據分析平台',
    description: '建立數據分析平台，用於分析和視覺化吶語症語音識別的結果。此平台協助研究團隊更好地理解模型表現和改進方向。',
    link: 'https://dmcair.ntpu.edu.tw:5173/',
    technologies: ['Data Analysis', 'Visualization', 'React', 'Python']
  }
];

const ProjectCard = ({ project, index }: { project: typeof projectsList[0]; index: number }) => {
  return (
    <Grid item xs={12} md={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom component="h2">
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
            {project.description}
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
            查看專案
          </Button>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const Projects = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        專案作品
      </Typography>
      
      <Grid container spacing={3}>
        {projectsList.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default Projects; 