import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { useDrawer } from './Side-Bar-Context';
import Tooltip from '@mui/material/Tooltip';
import Poper from './Poper';
import {useLocation} from 'react-router-dom';
import FunDoo from '../Dashboard/FunDoo';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 9,
  backgroundColor: alpha(theme.palette.grey[300], 0.6),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[400], 0.8),
  },
  marginLeft: theme.spacing(8),
  width: '100%',
  maxWidth: 750,
  height:'45px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`, 
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {toggleDrawer,handlepattern,click} = useDrawer();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const location = useLocation();
  const title=location.pathname ==='/' ? 'FunDoo' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  const isMenuOpen = Boolean(anchorEl);
   const handleProfileClick = (event) =>{
    setAnchorEl(anchorEl ? null : event.currentTarget);
   };

   const handleClose = ()=>{
    setAnchorEl(null);
   };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: '#fff', color: '#000', top:0,left:0,zIndex:(theme) => theme.zIndex.drawer+1}}
      >
        <Toolbar>
          <Tooltip title="Main menu">
          <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          </Tooltip>
          
  <Tooltip title="Fundoo">
          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            alt="Keep"
            style={{ width: 40, height: 40,display:title ==='FunDoo' ? 'block' : 'none' }}
          />
          </Tooltip>
          <Typography variant="h6" sx={{ ml: 1, mr: 3 }}>
           {title}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
      <Tooltip title="Refresh">
          <IconButton style={{opacity:'0.5'}} size="large" color="inherit">
            <RefreshOutlinedIcon />
          </IconButton>
          </Tooltip>
     
          <IconButton style={{opacity:'0.5'}} size="large" color="inherit" onClick={handlepattern}>
            {click?<Tooltip title="list view"><GridViewOutlinedIcon /></Tooltip>:<Tooltip title="grid view"><ViewStreamOutlinedIcon /></Tooltip>}
          </IconButton> 
         
      <Tooltip title="Setting">  
            <IconButton style={{opacity:'0.5'}} size="large" color="inherit">
            <SettingsOutlinedIcon />
          </IconButton>
          </Tooltip>

      <Tooltip title="Grid">
          <IconButton style={{opacity:'0.5'}} size="large" color="inherit">
            <AppsOutlinedIcon />
          </IconButton>
          </Tooltip>

      <Tooltip title="Profile">
            <IconButton style={{opacity:'0.5'}} onClick={handleProfileClick}>
              <AccountCircle />
            </IconButton>
          </Tooltip>
       </Toolbar>
   </AppBar>
  <Toolbar/>
      
<Poper anchorEl={anchorEl} onClose={handleClose} />
    </Box>
  );
}



