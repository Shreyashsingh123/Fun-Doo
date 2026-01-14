import React from 'react'
import { useState } from 'react';
import {Card}from '@mui/material';
import Popper from '@mui/material/Popper';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Avatar, ClickAwayListener } from '@mui/material';
import Typography from '@mui/material/Typography';
import {Divider} from '@mui/material';
import { useNavigate,Link } from "react-router-dom";

function Poper({anchorEl,onclose}) {
    const open=Boolean(anchorEl);
  return (
   <Popper open={open} anchorEl={anchorEl} disablePortal>
    <ClickAwayListener onClickAway={onclose}>
  
    <Card
          sx={{
            width: 400,
            mt: 3,
            mr:3,
            p: 2,
            borderRadius: 5,
            boxShadow: 5,
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

         <Divider sx={{my:2}}/>
    <div style={{display:"flex",flexDirection:"row",gap:'2px'}}>
    <Button   component={Link} to="/signin" sx={{borderRadius:2,height:'55px'}}fullWidth variant="outlined">Add Account</Button>
        <Button  sx={{borderRadius:2}} fullWidth variant="outlined">SignOut</Button>
    </div>
    </Card>
    </ClickAwayListener>
    </Popper>
  )
}

export default Poper
