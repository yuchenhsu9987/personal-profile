import React, { useRef, useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Chip, Button, Backdrop, CircularProgress, Avatar } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DownloadIcon from '@mui/icons-material/Download';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import profileImage from '../assets/images/profile.png';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Resume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();

  const handleDownload = async () => {
    if (resumeRef.current) {
      try {
        setIsGenerating(true);

        // 暫時移除所有動畫效果
        const animations = resumeRef.current.querySelectorAll('.MuiBox-root');
        animations.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.transform = 'none';
            el.style.transition = 'none';
          }
        });

        // 等待一下確保動畫已停止
        await new Promise(resolve => setTimeout(resolve, 100));

        const element = resumeRef.current;
        const originalStyle = {
          width: element.style.width,
          height: element.style.height,
          padding: element.style.padding,
          transform: element.style.transform,
          fontSize: window.getComputedStyle(element).fontSize
        };

        // 調整容器大小和縮放
        element.style.width = '210mm';
        element.style.height = 'auto';
        element.style.padding = '12mm';
        element.style.transform = 'scale(1)';
        // 調整基礎字體大小
        element.style.fontSize = '12px';

        // 調整其他文字大小
        const headings = element.querySelectorAll('h1, h2, h3');
        headings.forEach((heading) => {
          if (heading instanceof HTMLElement) {
            const currentSize = parseInt(window.getComputedStyle(heading).fontSize);
            heading.style.fontSize = `${currentSize * 1.2}px`;
          }
        });

        // 創建 PDF
        const pdf = new jsPDF({
          format: 'a4',
          unit: 'mm',
          orientation: 'portrait'
        });

        // 生成 canvas，提高縮放比例以獲得更好的質量
        const canvas = await html2canvas(element, {
          scale: 4,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          imageTimeout: 0,
          onclone: (clonedDoc) => {
            const avatar = clonedDoc.querySelector('img[alt="許育宸"]');
            if (avatar instanceof HTMLImageElement) {
              avatar.style.imageRendering = 'high-quality';
            }
          }
        });

        // 恢復原始樣式
        element.style.width = originalStyle.width;
        element.style.height = originalStyle.height;
        element.style.padding = originalStyle.padding;
        element.style.transform = originalStyle.transform;
        element.style.fontSize = originalStyle.fontSize;
        headings.forEach((heading) => {
          if (heading instanceof HTMLElement) {
            heading.style.fontSize = '';
          }
        });

        // 計算適當的縮放比例
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 5;

        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const scaleFactor = Math.min(1, (pageHeight - margin * 2) / imgHeight);
        const finalWidth = imgWidth * scaleFactor;
        const finalHeight = imgHeight * scaleFactor;

        const xPosition = (pageWidth - finalWidth) / 2;
        const yPosition = (pageHeight - finalHeight) / 2;

        // 添加到 PDF，使用更高的图像质量设置
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          xPosition,
          yPosition,
          finalWidth,
          finalHeight,
          undefined,
          'FAST',
          0
        );

        // 下載 PDF
        pdf.save(language === 'en' ? 'RufusHSU-Resume.pdf' : '許育宸-履歷.pdf');
      } catch (error) {
        console.error('PDF 生成失敗:', error);
        alert(language === 'en' ? 'PDF generation failed, please try again later' : 'PDF 生成失敗，請稍後再試');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('download') === 'true') {
      // 等待頁面完全渲染後再觸發下載
      const timer = setTimeout(() => {
        handleDownload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isGenerating}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, color: 'white' }}>
            {language === 'en' ? 'Generating PDF...' : '正在生成 PDF...'}
          </Typography>
        </Box>
      </Backdrop>

      <Box sx={{ 
        position: 'relative',
        maxWidth: '210mm',
        mx: 'auto',
        '@media print': {
          maxWidth: '210mm',
          margin: 0,
          padding: 0,
        }
      }}>
        {/* 下載按鈕 */}
        <Box sx={{ 
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000
        }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              disabled={isGenerating}
              sx={{
                borderRadius: 8,
                px: 3,
                py: 1.5,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                }
              }}
            >
              {isGenerating 
                ? (language === 'en' ? 'Generating...' : '生成中...') 
                : (language === 'en' ? 'Download Resume' : '下載履歷')}
            </Button>
          </motion.div>
        </Box>

        {/* 履歷內容 */}
        <Box ref={resumeRef} sx={{ 
          fontFamily: "'Roboto', sans-serif",
          color: '#2c2c2c',
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          '@media print': {
            width: '210mm',
            height: '297mm',
            padding: '15mm',
            margin: 0,
            boxShadow: 'none',
            borderRadius: 0,
          }
        }}>
          {/* 頭部區域 */}
          <motion.div>
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  alt={language === 'en' ? 'Yu-Chen HSU' : '許育宸'}
                  src={profileImage}
                  sx={{
                    width: 80,
                    height: 80,
                    border: '3px solid',
                    borderColor: 'primary.main',
                    boxShadow: 3,
                    mb: 1,
                    bgcolor: 'primary.main',
                    objectFit: 'cover',
                    '@media print': {
                      width: '80px',
                      height: '80px',
                      aspectRatio: '1',
                    }
                  }}
                />
              </Box>
              
              <Typography variant="h1" sx={{ 
                fontSize: '28px',
                color: '#2c2c2c',
                mb: 0.5,
                fontWeight: 300
              }}>
                {language === 'en' ? 'Yu-Chen HSU' : '許育宸'}
              </Typography>
              <Typography variant="h2" sx={{ 
                fontSize: '16px',
                color: '#666666',
                mb: 1,
                fontWeight: 400
              }}>
                {language === 'en' 
                  ? 'Graduate Student in Computer Science | Software Developer' 
                  : '資訊工程研究生 | 軟體開發者'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography variant="body2">rufushsu9987@gmail.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography variant="body2">0975-115-201</Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <Box sx={{ height: '1px', bgcolor: 'primary.main', opacity: 0.2, my: 1.5 }} />

          {/* 教育背景 */}
          <motion.div>
            <Box sx={{ my: 1.5 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '18px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1
              }}>
                {language === 'en' ? 'Education' : '教育背景'}
              </Typography>
              
              <Timeline sx={{ 
                p: 0,
                m: 0,
                '& .MuiTimelineItem-root:before': {
                  flex: 0,
                  padding: 0
                }
              }}>
                <TimelineItem>
                  <TimelineOppositeContent sx={{ 
                    flex: 0.1,
                    color: 'text.secondary',
                    fontSize: '13px'
                  }}>
                    {language === 'en' ? '2023.09 - Present' : '2023.09 - 至今'}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" sx={{ p: 0.5 }}>
                      <SchoolIcon sx={{ fontSize: 14 }} />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ pb: 1.5 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '15px',
                        fontWeight: 500,
                        mb: 0.25
                      }}>
                        {language === 'en' ? 'National Taipei University' : '國立臺北大學'}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666666',
                        mb: 0.25,
                        fontSize: '13px'
                      }}>
                        {language === 'en' 
                          ? 'Master of Science in Computer Science and Information Engineering' 
                          : '資訊工程研究所 - 碩士班'}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.4, fontSize: '13px' }}>
                        {language === 'en'
                          ? 'Research focuses on Natural Language Processing and Speech Recognition. Currently participating in the MOST Inclusive-Oriented Project.'
                          : '主要研究方向為自然語言處理與語音辨識，目前參與科技部國家科學及技術委員會包容導向計劃子計劃二。'}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent sx={{ 
                    flex: 0.1,
                    color: 'text.secondary',
                    fontSize: '13px'
                  }}>
                    2019.09 - 2023.06
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" sx={{ p: 0.5 }}>
                      <SchoolIcon sx={{ fontSize: 14 }} />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography variant="h3" sx={{ 
                        fontSize: '15px',
                        fontWeight: 500,
                        mb: 0.25
                      }}>
                        {language === 'en' 
                          ? 'National Kaohsiung University of Science and Technology' 
                          : '國立高雄科技大學'}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666666',
                        mb: 0.25,
                        fontSize: '13px'
                      }}>
                        {language === 'en'
                          ? 'Bachelor of Science in Computer Science and Information Engineering'
                          : '資訊工程學系 - 學士'}
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.4, fontSize: '13px' }}>
                        {language === 'en'
                          ? 'Independent research project on "Chinese Character Error Correction System" in collaboration with NTNU Chinese Language Technology Center.'
                          : '獨立研究專題為「中文錯別字校正系統」，與國立臺灣師範大學華語文與科技研究中心合作。'}
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </motion.div>

          {/* 專業技能 */}
          <motion.div>
            <Box sx={{ my: 1.5 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '18px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1
              }}>
                {language === 'en' ? 'Professional Skills' : '專業技能'}
              </Typography>

              <Grid container spacing={1.5}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.75
                    }}>
                      {language === 'en' ? 'Programming Languages' : '程式語言'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="Python" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="C/C++" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="JavaScript" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="TypeScript" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="Java" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.75
                    }}>
                      {language === 'en' ? 'Domain Knowledge' : '領域知識'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip 
                        label={language === 'en' ? 'Natural Language Processing' : '自然語言處理'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip 
                        label={language === 'en' ? 'Speech Recognition' : '語音辨識'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip 
                        label={language === 'en' ? 'Machine Learning' : '機器學習'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip 
                        label={language === 'en' ? 'Deep Learning' : '深度學習'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.75
                    }}>
                      {language === 'en' ? 'Tools & Frameworks' : '工具與框架'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="TensorFlow" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="PyTorch" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="Git" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="Docker" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="React" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          {/* 專案經驗 */}
          <motion.div>
            <Box sx={{ my: 1.5 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '18px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1
              }}>
                {language === 'en' ? 'Projects' : '專案經驗'}
              </Typography>

              <Grid container spacing={1.5}>
                {/* Ask About Me */}
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        Ask About Me
                      </Typography>
                      <Box 
                        component="a"
                        href="https://ask-aboutme.firebaseapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          '&:hover': { opacity: 0.8 }
                        }}
                      >
                        <QRCodeSVG value="https://ask-aboutme.firebaseapp.com/" size={24} level="L" />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, flex: 1, fontSize: '0.875rem' }}>
                      {language === 'en'
                        ? 'A cross-platform application built with React and TypeScript that integrates OpenAI API to provide intelligent Q&A functionality.'
                        : '基於 React 和 TypeScript 的跨平台應用，整合 OpenAI API 來提供智慧問答功能。'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="React" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="TypeScript" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="OpenAI API" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>

                {/* LLM Chat-Bot */}
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        LLM Chat-Bot
                      </Typography>
                      <Box 
                        component="a"
                        href="https://chat-bot-39815.web.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          '&:hover': { opacity: 0.8 }
                        }}
                      >
                        <QRCodeSVG value="https://chat-bot-39815.web.app/" size={24} level="L" />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, flex: 1, fontSize: '0.875rem' }}>
                      {language === 'en'
                        ? 'An intelligent chatbot developed with large language models, supporting multi-turn dialogue with context understanding capabilities.'
                        : '基於大型語言模型開發的智能對話機器人，支持多輪對話並具有上下文理解能力。'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="React" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="Firebase" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="LLM" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>

                {/* Crypto Tracker */}
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        Crypto Tracker
                      </Typography>
                      <Box 
                        component="a"
                        href="https://crypto-dba3b.web.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          '&:hover': { opacity: 0.8 }
                        }}
                      >
                        <QRCodeSVG value="https://crypto-dba3b.web.app/" size={24} level="L" />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, flex: 1, fontSize: '0.875rem' }}>
                      {language === 'en'
                        ? 'A cryptocurrency tracking application developed with React, providing real-time price updates and market trend analysis.'
                        : '使用 React 開發的加密貨幣追蹤應用，提供即時價格更新和市場趨勢分析。'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="React" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="Firebase" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip label="API" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>

                {/* 吶語症模型測試與收音系統 */}
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        {language === 'en' 
                          ? 'Dysarthria Model Testing System' 
                          : '吶語症模型測試系統'}
                      </Typography>
                      <Box 
                        component="a"
                        href="https://120.126.151.159:56432/trans"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          '&:hover': { opacity: 0.8 }
                        }}
                      >
                        <QRCodeSVG value="https://120.126.151.159:56432/trans" size={24} level="L" />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, flex: 1, fontSize: '0.875rem' }}>
                      {language === 'en'
                        ? 'Developed a platform for collecting and testing voice samples from dysarthria patients, providing real-time testing capabilities.'
                        : '開發針對吶語症患者的語音收集和測試平台，用於收集語音樣本並進行即時測試。'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="Python" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                      <Chip 
                        label={language === 'en' ? 'Speech Processing' : '語音處理'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip 
                        label={language === 'en' ? 'Deep Learning' : '深度學習'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                    </Box>
                  </Paper>
                </Grid>

                {/* 吶語症數據分析平台 */}
                <Grid item xs={12} sm={6}>
                  <Paper elevation={1} sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        {language === 'en'
                          ? 'Dysarthria Data Analysis Platform'
                          : '吶語症數據分析平台'}
                      </Typography>
                      <Box 
                        component="a"
                        href="https://dmcair.ntpu.edu.tw:5173/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          color: 'primary.main',
                          '&:hover': { opacity: 0.8 }
                        }}
                      >
                        <QRCodeSVG value="https://dmcair.ntpu.edu.tw:5173/" size={24} level="L" />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, flex: 1, fontSize: '0.875rem' }}>
                      {language === 'en'
                        ? 'Built a data analysis platform for analyzing and visualizing dysarthria speech recognition results, assisting research improvements.'
                        : '建立數據分析平台，用於分析和視覺化吶語症語音識別的結果，協助研究改進。'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip 
                        label={language === 'en' ? 'Data Analysis' : '數據分析'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip 
                        label={language === 'en' ? 'Visualization' : '視覺化'} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: '20px' }} 
                      />
                      <Chip label="React" size="small" color="primary" variant="outlined" sx={{ height: '20px' }} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          {/* 其他專長 */}
          <motion.div>
            <Box sx={{ my: 1.5 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '18px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1
              }}>
                {language === 'en' ? 'Others' : '其他'}
              </Typography>

              <Grid container spacing={1.5}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.25
                    }}>
                      {language === 'en' ? 'Language Skills' : '語言能力'}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.4, fontSize: '13px' }}>
                      {language === 'en' 
                        ? 'Chinese (Native), English (TOEIC 660)' 
                        : '中文（母語）、英文（ TOEIC 660分）'}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.25
                    }}>
                      {language === 'en' ? 'Research Interests' : '研究興趣'}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.4, fontSize: '13px' }}>
                      {language === 'en'
                        ? 'Natural Language Processing, Speech Recognition, Computer Vision'
                        : '自然語言處理、語音辨識、電腦視覺'}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.25 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '15px',
                      fontWeight: 500,
                      mb: 0.25
                    }}>
                      {language === 'en' ? 'Personal Interests' : '個人興趣'}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.4, fontSize: '13px' }}>
                      {language === 'en'
                        ? 'Sports (Basketball, Badminton, Tennis), Fitness, Cryptocurrency Research'
                        : '運動（籃球、羽球、網球）、健身、加密貨幣研究'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          <Box sx={{ height: '1px', bgcolor: 'primary.main', opacity: 0.2, my: 1 }} />

          <Box sx={{ textAlign: 'center', py: 0.5 }}>
            <Typography variant="body2" sx={{ color: '#666666', fontSize: '12px' }}>
              {language === 'en' 
                ? 'Last updated: March 2025'
                : '此履歷更新於 2025年3月'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Resume; 