import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c8164',
      light: '#b69f8c',
      dark: '#7c6345',
    },
    secondary: {
      main: '#4a4a4a',
      light: '#6c6c6c',
      dark: '#2c2c2c',
    },
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 300,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 2,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                position: 'fixed',
                top: 16,
                left: 16,
                zIndex: 1200,
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: 'background.paper',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Navbar mobileOpen={mobileOpen} onClose={handleDrawerToggle} isMobile={isMobile} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              width: { xs: '100%', md: `calc(100% - ${240}px)` },
              mt: { xs: 7, md: 0 },
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="resume" element={<Resume />} />
              <Route path="education" element={<Education />} />
              <Route path="projects" element={<Projects />} />
              <Route path="skills" element={<Skills />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
