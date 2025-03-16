import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';

const Education = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        學歷背景
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
                國立臺北大學
              </Typography>
              <Typography color="textSecondary">
                資訊工程研究所 - 碩士班（2022.09 - 至今）
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                專注於進階資訊工程研究，深入探討電腦科學領域的前沿技術，
                主要研究方向為機器學習與電腦視覺應用。
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
                國立高雄科技大學
              </Typography>
              <Typography color="textSecondary">
                資訊工程學系 - 學士（2018.09 - 2022.06）
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                奠定紮實的電腦科學基礎，培養專業技能和實務經驗。
                在學期間積極參與專案開發，建立了良好的程式設計能力。
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default Education; 