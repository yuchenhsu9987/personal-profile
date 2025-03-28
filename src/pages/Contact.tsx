import React from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ContactItem = ({ icon, title, content, delay }: { icon: React.ReactNode; title: string; content: string; delay: number }) => {
  return (
    <Grid item xs={12} md={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
      >
        <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2, color: 'primary.main' }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {content}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const Contact = () => {
  const { t } = useLanguage();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {t('contactTitle')}
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Grid container spacing={3}>
          <ContactItem
            icon={<EmailIcon fontSize="large" />}
            title={t('email')}
            content="rufushsu9987@gmail.com"
            delay={0.2}
          />
          <ContactItem
            icon={<PhoneIcon fontSize="large" />}
            title={t('phone')}
            content="0975-115-201"
            delay={0.4}
          />
          {/* <ContactItem
            icon={<GitHubIcon fontSize="large" />}
            title="GitHub"
            content="github.com/yuchenhsu9987"
            delay={0.6}
          /> */}
        </Grid>
{/* 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              {t('contactTitle')}
            </Typography>
            <Typography variant="body1">
              {t('aboutDescription')}
            </Typography>
          </Paper>
        </motion.div> */}
      </Box>
    </Container>
  );
};

export default Contact; 