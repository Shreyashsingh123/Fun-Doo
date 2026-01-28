import React from 'react'
import { useState } from 'react';
import {Card}from '@mui/material';
import Popper from '@mui/material/Popper';

import Box from '@mui/material/Box'
import { Avatar, ClickAwayListener } from '@mui/material';
import Typography from '@mui/material/Typography';
import {Divider} from '@mui/material';

import Button from '@mui/material/Button';
import { useNavigate,Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
function Poper({anchorEl,onclose}) {
    const open=Boolean(anchorEl);
  return (
   <Popper open={open} anchorEl={anchorEl} disablePortal sx={{zIndex:1300}}>
    <ClickAwayListener onClickAway={onclose}>
  
    <Card
          sx={{
            width: 390,
            height:280,
            mt: 3,
            mr:3,
            p: 2,
            borderRadius: 5,
            boxShadow: 2,
            backgroundColor:"lightgray",
          }}
    >
        <Box sx={{display:"flex",justifyContent:'center'}}>
           <Avatar sx={{backgroundColor:"orange",width:"90px",height:"90px",fontSize:"25px"}}>
            S
           </Avatar>
        </Box>
        
        <Typography variant="h5" align="center" sx={{fontWeight:"bold",mt:1,mb:0}}>
          Hi, Shreyash!
          </Typography>
        <Typography variant="h6" align="center" sx={{mt:0}}>
          shreyash18@gmail.com
          </Typography>

         <Divider sx={{my:3}}/>
    <div style={{display:"flex",flexDirection:"row",gap:'2px',mt:2}}>
    <Button   component={Link} to="/signin" sx={{borderBottomLeftRadius:25,borderTopLeftRadius:25, height:'55px',backgroundColor:'white',fontsize:'15px',color:'black'}}fullWidth variant="outlined">
      <AddIcon/>
      Add Account</Button>
        <Button  sx={{borderTopRightRadius:25,borderBottomRightRadius:25,backgroundColor:'white',fontsize:'15px',color:'black'}} fullWidth variant="outlined">
          <LogoutOutlinedIcon/>
          SignOut</Button>
    </div>
    </Card>

    </ClickAwayListener>
    </Popper>
  )
}

export default Poper
