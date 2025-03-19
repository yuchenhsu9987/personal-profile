import React from 'react';
import { Container, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import SchoolIcon from '@mui/icons-material/School';
import { useLanguage } from '../contexts/LanguageContext';

const Education = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { language } = useLanguage();

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: { xs: 3, sm: 4 },
          fontWeight: 300,
          color: 'primary.main',
        }}
      >
        {language === 'en' ? 'Education Background' : '學歷背景'}
      </Typography>
      
      <Timeline position="alternate" sx={{ 
        p: 0,
        [`& .MuiTimelineItem-root:before`]: {
          flex: isMobile ? 0.15 : 1,
        },
      }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ p: isMobile ? 1 : 1.5 }}>
              <SchoolIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: { xs: '12px', sm: '20px' }, px: { xs: 1, sm: 3 } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 3 }, 
                mb: 2,
                '&:hover': {
                  boxShadow: theme.shadows[6],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="h2" 
                sx={{ 
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              >
                {language === 'en' ? 'National Taipei University' : '國立臺北大學'}
              </Typography>
              <Typography 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.8125rem', sm: '1rem' },
                  mt: 0.5,
                }}
              >
                {language === 'en' 
                  ? 'Master of Science in Computer Science and Information Engineering' 
                  : '資訊工程研究所 - 碩士班'}
              </Typography>
              <Typography 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {language === 'en' ? '(2023.09 - Present)' : '（2023.09 - 至今）'}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: 1.6,
                }}
              >
                {language === 'en' 
                  ? 'Research focuses on Natural Language Processing and Speech Recognition. Currently participating in the Ministry of Science and Technology (MOST) Inclusive-Oriented Project Subproject 2, dedicated to developing a selective mutism recognition system using deep learning technology to assist individuals with language disabilities in communication.'
                  : '主要研究方向為自然語言處理與語音辨識，目前參與科技部國家科學及技術委員會(國科會)包容導向計劃子計劃二，致力於開發吶語症辨識系統，運用深度學習技術協助語言障礙者進行溝通。'}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" sx={{ p: isMobile ? 1 : 1.5 }}>
              <SchoolIcon sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ py: { xs: '12px', sm: '20px' }, px: { xs: 1, sm: 3 } }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 1.5, sm: 3 },
                '&:hover': {
                  boxShadow: theme.shadows[6],
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                component="h2"
                sx={{ 
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              >
                {language === 'en' 
                  ? 'National Kaohsiung University of Science and Technology' 
                  : '國立高雄科技大學'}
              </Typography>
              <Typography 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.8125rem', sm: '1rem' },
                  mt: 0.5,
                }}
              >
                {language === 'en' 
                  ? 'Bachelor of Science in Computer Science and Information Engineering' 
                  : '資訊工程學系 - 學士'}
              </Typography>
              <Typography 
                color="textSecondary"
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {language === 'en' ? '(2019.09 - 2023.06)' : '（2019.09 - 2023.06）'}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  lineHeight: 1.6,
                }}
              >
                {language === 'en' 
                  ? 'Independent research project focused on "Chinese Character Error Correction System". Collaborated with the Chinese Language and Technology Center at National Taiwan Normal University to apply research results to the SWM Writing Correction Platform.'
                  : '獨立研究專題主題為「中文錯別字校正系統」，與國立臺灣師範大學華語文與科技中心合作，將研究成果應用於 SWM 寫作批改平台。'}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

export default Education;