import React from 'react';
import { Container, Typography, Grid, Paper, LinearProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';

const skillsList = [
  { name: '程式设计', level: 90, description: '熟悉 Java, Python, JavaScript/TypeScript' },
  { name: '网页开发', level: 85, description: 'React, Node.js, HTML/CSS' },
  { name: '数据库', level: 80, description: 'MySQL, MongoDB, PostgreSQL' },
  { name: '算法与数据结构', level: 85, description: '扎实的计算机科学基础' },
  { name: '软体工程', level: 80, description: '敏捷开发, Git, CI/CD' },
  { name: '机器学习', level: 75, description: '基础机器学习知识与实践经验' },
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
        <Typography variant="body2" color="textSecondary">
          {skill.description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        专业技能
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