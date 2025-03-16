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
                資訊工程研究所 - 碩士班（2023.09 - 至今）
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                主要研究方向為自然語言處理與語音辨識，目前參與科技部國家科學及技術委員會(國科會)包容導向計劃子計劃二，
                致力於開發吶語症辨識系統，運用深度學習技術協助語言障礙者進行溝通。
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
                資訊工程學系 - 學士（2019.09 - 2023.06）
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                專題研究主題為「中文錯別字校正系統」，與國立臺灣師範大學華語文教學系暨研究所合作，
                將研究成果應用於 SWM 寫作批改平台。獨立完成專題研究，培養自主思考與解決問題的能力。
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default Education; 