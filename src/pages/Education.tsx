import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';

const Education = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        教育背景
      </Typography>
      
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" component="h2">
                国立台北大学
              </Typography>
              <Typography color="textSecondary">
                资讯工程研究所 - 硕士二年级
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                专注于进阶资讯工程研究，深入探讨计算机科学领域的前沿技术
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <SchoolIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" component="h2">
                国立高雄科技大学
              </Typography>
              <Typography color="textSecondary">
                资讯工程学系 - 学士
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                打下扎实的计算机科学基础，培养专业技能和实践经验
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default Education; 