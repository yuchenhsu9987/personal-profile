import React from 'react';
import { Container, Typography, Grid, Paper, LinearProgress, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Skills = () => {
  const { t, language } = useLanguage();

  const technicalSkillsList = [
    { 
      name: language === 'en' ? 'Python Development' : 'Python 開發',
      level: 95,
      description: language === 'en' 
        ? 'Python development, including data analysis, machine learning applications, Deep Learning, and web backend development'
        : 'Python 開發，包括數據分析、機器學習、深度學習應用和網頁後端開發',
      tags: ['Python', 'NumPy', 'Pandas', 'Flask', 'Django']
    },
    { 
      name: language === 'en' ? 'Machine Learning/Deep Learning' : '機器學習/深度學習',
      level: 90,
      description: language === 'en'
        ? 'TensorFlow, PyTorch, Scikit-learn, focusing on Natural Language Processing'
        : 'TensorFlow, PyTorch, Scikit-learn, 專注於自然語言處理',
      tags: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
    },
    { 
      name: language === 'en' ? 'Other Programming Languages' : '其他程式語言',
      level: 80,
      description: language === 'en'
        ? 'Experience with multiple programming languages'
        : '具備多種程式語言開發經驗',
      tags: ['Java', 'C/C++', 'JavaScript', 'TypeScript']
    },
    { 
      name: language === 'en' ? 'Web Development' : '網頁開發',
      level: 85,
      description: 'React, Node.js, HTML/CSS',
      tags: ['React', 'Node.js', 'HTML/CSS']
    },
    { 
      name: language === 'en' ? 'Databases' : '資料庫',
      level: 80,
      description: 'MongoDB, MySQL',
      tags: ['MongoDB', 'MySQL']
    },
    { 
      name: language === 'en' ? 'Development Tools' : '開發工具',
      level: 85,
      description: 'Git, Docker, Linux, VS Code, Cursor',
      tags: ['Git', 'Docker', 'Linux', 'VS Code', 'Cursor']
    },
  ];

  const languageSkillsList = [
    { 
      name: language === 'en' ? 'Language Skills' : '語言能力',
      level: 85,
      description: language === 'en'
        ? 'Native Chinese speaker, TOEIC score 660'
        : '中文為母語，具備英語能力TOEIC 成績 660 分',
      tags: language === 'en' ? ['Chinese', 'English', 'TOEIC 660'] : ['中文', '英文', 'TOEIC 660']
    },
  ];

  const SkillCard = ({ skill, index }: { skill: typeof technicalSkillsList[0]; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {skill.name}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={skill.level}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {skill.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skill.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Paper>
      </motion.div>
    );
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {t('skillsTitle')}
      </Typography>
      
      <Grid container spacing={3}>
        {technicalSkillsList.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} key={skill.name}>
            <SkillCard skill={skill} index={index} />
          </Grid>
        ))}
      </Grid>

      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 4,
          mt: 6,
          color: 'primary.main',
          fontWeight: 300,
        }}
      >
        {t('languages')}
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {languageSkillsList.map((skill, index) => (
          <Grid item xs={12} sm={8} md={6} key={skill.name}>
            <SkillCard skill={skill} index={technicalSkillsList.length + index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Skills; 
