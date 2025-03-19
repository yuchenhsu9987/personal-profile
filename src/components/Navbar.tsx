import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DescriptionIcon from '@mui/icons-material/Description';
import BuildIcon from '@mui/icons-material/Build';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const drawerWidth = 240;

interface NavbarProps {
  mobileOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mobileOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useLanguage();

  const menuItems = [
    { text: t('home'), icon: <HomeIcon />, path: '/' },
    { text: t('resume'), icon: <DescriptionIcon />, path: 'resume' },
    { text: t('education'), icon: <SchoolIcon />, path: 'education' },
    { text: t('projects'), icon: <CodeIcon />, path: 'projects' },
    { text: t('skills'), icon: <BuildIcon />, path: 'skills' },
    { text: t('contact'), icon: <ContactMailIcon />, path: 'contact' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/personal-profile', '');
    if (path === '/') {
      return currentPath === '/' || currentPath === '';
    }
    return currentPath === `/${path}`;
  };

  const drawer = (
    <>
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 500,
            letterSpacing: 1,
            marginBottom: 2,
          }}
        >
          {t('aboutMe')}
        </Typography>
        <LanguageSwitcher />
      </Box>
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) {
                onClose();
              }
            }}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              backgroundColor: isActive(item.path) ? 'rgba(156, 129, 100, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(156, 129, 100, 0.12)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.secondary,
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                  fontWeight: isActive(item.path) ? 500 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: theme.palette.background.paper,
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: theme.palette.background.paper,
              boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar; 