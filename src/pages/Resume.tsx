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

const Resume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const location = useLocation();

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

        // 設定 A4 尺寸（以 px 為單位，96 dpi）
        const a4Width = 827; // 8.27 inches * 96 dpi
        const a4Height = 1169; // 11.69 inches * 96 dpi

        // 調整容器大小為 A4
        const element = resumeRef.current;
        const originalStyle = {
          width: element.style.width,
          height: element.style.height,
          padding: element.style.padding
        };

        element.style.width = `${a4Width}px`;
        element.style.height = 'auto';
        element.style.padding = '40px';

        // 生成 PDF
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: a4Width,
          height: element.scrollHeight,
        });

        // 恢復原始樣式
        element.style.width = originalStyle.width;
        element.style.height = originalStyle.height;
        element.style.padding = originalStyle.padding;

        // 創建 PDF（A4 尺寸：210mm x 297mm）
        const pdf = new jsPDF({
          format: 'a4',
          unit: 'mm',
          orientation: 'portrait'
        });

        // 計算縮放比例以適應一頁
        const imgWidth = 210;
        const imgHeight = Math.min((canvas.height * imgWidth) / canvas.width, 297);
        
        // 添加到 PDF（置中對齊）
        const xPosition = 0;
        const yPosition = (297 - imgHeight) / 2;
        
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          xPosition,
          yPosition,
          imgWidth,
          imgHeight
        );

        // 下載 PDF
        pdf.save('許育宸-履歷.pdf');
      } catch (error) {
        console.error('PDF 生成失敗:', error);
        alert('PDF 生成失敗，請稍後再試');
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
            正在生成 PDF...
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
              {isGenerating ? '生成中...' : '下載履歷'}
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
            <Box sx={{ textAlign: 'center', py: 1.5 }}>
              <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  alt="許育宸"
                  src={profileImage}
                  sx={{
                    width: 100,
                    height: 100,
                    border: '3px solid',
                    borderColor: 'primary.main',
                    boxShadow: 3,
                    mb: 1.5,
                    bgcolor: 'primary.main',
                  }}
                />
              </Box>
              
              <Typography variant="h1" sx={{ 
                fontSize: '32px',
                color: '#2c2c2c',
                mb: 0.5,
                fontWeight: 300
              }}>
                許育宸
              </Typography>
              <Typography variant="h2" sx={{ 
                fontSize: '16px',
                color: '#666666',
                mb: 1.5,
                fontWeight: 400
              }}>
                資訊工程研究生 | 軟體開發者
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2">rufushsu9987@gmail.com</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                  <Typography variant="body2">0975-115-201</Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <Box sx={{ height: '1px', bgcolor: 'primary.main', opacity: 0.2, my: 2 }} />

          {/* 教育背景 */}
          <motion.div>
            <Box sx={{ my: 2 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '20px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1.5
              }}>
                教育背景
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
                    fontSize: '14px'
                  }}>
                    2023.09 - 至今
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <SchoolIcon sx={{ fontSize: 16 }} />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ pb: 2 }}>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        國立臺北大學
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666666',
                        mb: 0.5
                      }}>
                        資訊工程研究所 - 碩士班
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                        主要研究方向為自然語言處理與語音辨識，目前參與科技部國家科學及技術委員會包容導向計劃子計劃二。
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent sx={{ 
                    flex: 0.1,
                    color: 'text.secondary',
                    fontSize: '14px'
                  }}>
                    2019.09 - 2023.06
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <SchoolIcon sx={{ fontSize: 16 }} />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box>
                      <Typography variant="h3" sx={{ 
                        fontSize: '16px',
                        fontWeight: 500,
                        mb: 0.5
                      }}>
                        國立高雄科技大學
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#666666',
                        mb: 0.5
                      }}>
                        資訊工程學系 - 學士
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                        獨立研究專題為「中文錯別字校正系統」，與國立臺灣師範大學華語文與科技研究中心合作。
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </motion.div>

          {/* 專業技能 */}
          <motion.div>
            <Box sx={{ my: 2 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '20px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1.5
              }}>
                專業技能
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 1
                    }}>
                      程式語言
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="Python" size="small" color="primary" variant="outlined" />
                      <Chip label="C/C++" size="small" color="primary" variant="outlined" />
                      <Chip label="JavaScript" size="small" color="primary" variant="outlined" />
                      <Chip label="TypeScript" size="small" color="primary" variant="outlined" />
                      <Chip label="Java" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 1
                    }}>
                      領域知識
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="自然語言處理" size="small" color="primary" variant="outlined" />
                      <Chip label="語音辨識" size="small" color="primary" variant="outlined" />
                      <Chip label="機器學習" size="small" color="primary" variant="outlined" />
                      <Chip label="深度學習" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 1
                    }}>
                      工具與框架
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="TensorFlow" size="small" color="primary" variant="outlined" />
                      <Chip label="PyTorch" size="small" color="primary" variant="outlined" />
                      <Chip label="Git" size="small" color="primary" variant="outlined" />
                      <Chip label="Docker" size="small" color="primary" variant="outlined" />
                      <Chip label="React" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          {/* 專案經驗 */}
          <motion.div>
            <Box sx={{ my: 2 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '20px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1.5
              }}>
                專案經驗
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      LLM Chat-Bot
                      <Box 
                        component="a"
                        href="https://chat-bot-39815.web.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.5,
                      mb: 0.5
                    }}>
                      基於大型語言模型開發的智能對話機器人，支持多輪對話並具有上下文理解能力。使用 React 開發前端界面，Firebase 進行部署。
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="React" size="small" color="primary" variant="outlined" />
                      <Chip label="Firebase" size="small" color="primary" variant="outlined" />
                      <Chip label="LLM" size="small" color="primary" variant="outlined" />
                      <Chip label="TypeScript" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    pt: { xs: 2, md: 0 }
                  }}>
                    <Box sx={{ 
                      p: 0.75,
                      border: '1px solid',
                      borderColor: 'primary.light',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.25
                    }}>
                      <QRCodeSVG
                        value="https://chat-bot-39815.web.app/"
                        size={48}
                        level="L"
                        includeMargin={false}
                      />
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary',
                        fontSize: '11px'
                      }}>
                        掃碼訪問
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      Crypto Tracker
                      <Box 
                        component="a"
                        href="https://crypto-dba3b.web.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.5,
                      mb: 0.5
                    }}>
                      使用 React 和 Firebase 開發的加密貨幣追蹤應用。提供即時價格更新、市場趨勢分析，並支持用戶收藏喜愛的加密貨幣。
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="React" size="small" color="primary" variant="outlined" />
                      <Chip label="Firebase" size="small" color="primary" variant="outlined" />
                      <Chip label="Material-UI" size="small" color="primary" variant="outlined" />
                      <Chip label="API Integration" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    pt: { xs: 2, md: 0 }
                  }}>
                    <Box sx={{ 
                      p: 0.75,
                      border: '1px solid',
                      borderColor: 'primary.light',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.25
                    }}>
                      <QRCodeSVG
                        value="https://crypto-dba3b.web.app/"
                        size={48}
                        level="L"
                        includeMargin={false}
                      />
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary',
                        fontSize: '11px'
                      }}>
                        掃碼訪問
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      吶語症模型測試與收音系統
                      <Box 
                        component="a"
                        href="https://120.126.151.159:56432/trans"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.5,
                      mb: 0.5
                    }}>
                      開發專門針對吶語症患者的語音收集和測試平台，用於收集語音樣本並進行即時測試。
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="Python" size="small" color="primary" variant="outlined" />
                      <Chip label="語音處理" size="small" color="primary" variant="outlined" />
                      <Chip label="深度學習" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    pt: { xs: 2, md: 0 }
                  }}>
                    <Box sx={{ 
                      p: 0.75,
                      border: '1px solid',
                      borderColor: 'primary.light',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.25
                    }}>
                      <QRCodeSVG
                        value="https://120.126.151.159:56432/trans"
                        size={48}
                        level="L"
                        includeMargin={false}
                      />
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary',
                        fontSize: '11px'
                      }}>
                        掃碼訪問
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      吶語症模型數據分析平台
                      <Box 
                        component="a"
                        href="https://dmcair.ntpu.edu.tw:5173/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      lineHeight: 1.5,
                      mb: 0.5
                    }}>
                      建立數據分析平台，用於分析和視覺化吶語症語音識別的結果，協助研究團隊改進模型。
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip label="數據分析" size="small" color="primary" variant="outlined" />
                      <Chip label="視覺化" size="small" color="primary" variant="outlined" />
                      <Chip label="React" size="small" color="primary" variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'flex-start',
                    pt: { xs: 2, md: 0 }
                  }}>
                    <Box sx={{ 
                      p: 0.75,
                      border: '1px solid',
                      borderColor: 'primary.light',
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.25
                    }}>
                      <QRCodeSVG
                        value="https://dmcair.ntpu.edu.tw:5173/"
                        size={48}
                        level="L"
                        includeMargin={false}
                      />
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary',
                        fontSize: '11px'
                      }}>
                        掃碼訪問
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

            </Box>
          </motion.div>

          {/* 其他專長 */}
          <motion.div>
            <Box sx={{ my: 2 }}>
              <Typography variant="h2" sx={{ 
                fontSize: '20px',
                color: 'primary.main',
                fontWeight: 500,
                mb: 1.5
              }}>
                其他專長
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5
                    }}>
                      語言能力
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      中文（母語）、英文（中級 - TOEIC 665分）
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5
                    }}>
                      研究興趣
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      自然語言處理、語音辨識、電腦視覺
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper elevation={1} sx={{ p: 1.5 }}>
                    <Typography variant="h3" sx={{ 
                      fontSize: '16px',
                      fontWeight: 500,
                      mb: 0.5
                    }}>
                      個人興趣
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                      運動（籃球、羽球、網球）、健身、加密貨幣研究
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

          <Box sx={{ height: '1px', bgcolor: 'primary.main', opacity: 0.2, my: 1.5 }} />

          <Box sx={{ textAlign: 'center', py: 1 }}>
            <Typography variant="body2" sx={{ color: '#666666' }}>
              此履歷更新於 2025年3月
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Resume; 