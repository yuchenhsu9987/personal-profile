import React from 'react';
import { Button } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <Button
      variant="outlined"
      onClick={toggleLanguage}
      sx={{
        color: 'inherit',
        borderColor: 'inherit',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      {t('switchLang')}
    </Button>
  );
};

export default LanguageSwitcher; 