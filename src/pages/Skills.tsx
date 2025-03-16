import React from 'react';
import { Container, Typography, Grid, Paper, LinearProgress, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const skillsList = [
  { 
    name: 'Python 開發',
    level: 95,
    description: '精通 Python 開發，包括數據分析、機器學習應用和網頁後端開發',
    tags: ['Python', 'NumPy', 'Pandas', 'Flask', 'Django']
  },
  { 
    name: '機器學習/深度學習',
    level: 85,
    description: 'TensorFlow, PyTorch, Scikit-learn, 專注於電腦視覺應用',
    tags: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
  },
  { 
    name: '其他程式語言',
    level: 85,
    description: '具備多種程式語言開發經驗',
    tags: ['Java', 'C/C++', 'JavaScript', 'TypeScript']
  },
  { 
    name: '網頁開發',
    level: 85,
    description: 'React, Node.js, Express, HTML/CSS',
    tags: ['React', 'Node.js', 'Express', 'HTML/CSS']
  },
  { 
    name: '資料庫',
    level: 80,
    description: 'MySQL, MongoDB, PostgreSQL',
    tags: ['MySQL', 'MongoDB', 'PostgreSQL']
  },
  { 
    name: '開發工具',
    level: 85,
    description: 'Git, Docker, Linux, VS Code',
    tags: ['Git', 'Docker', 'Linux', 'VS Code']
  },
];

const SkillCard = ({ skill, index }: { skill: typeof skillsList[0]; index: number }) => {
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

const Skills = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        專業技能
      </Typography>
      
      <Grid container spacing={3}>
        {skillsList.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} key={skill.name}>
            <SkillCard skill={skill} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Skills; 