import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IconButton from '@mui/material/IconButton';
import { useDrawer } from './Side-Bar-Context';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Deletebtn from '@mui/icons-material/DeleteOutlineOutlined';

export default function Grid_view({ saved, setSaved }) {
  const { open } = useDrawer();

  const colors = [
    "#fff475",
    "#aecbfa",
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#d7aefb"
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);


  const handledelete = async (index) => {
    const note = saved[index];
    if (!note) return;
    setSaved(prev => prev.filter((_, i) => i !== index));
    try {
      await fetch(`http://localhost:5000/notes/${note.id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Trash: true }),
      })

    }
    catch (error) {
      console.log(error);
    }
  };

  
const handleArchieve=async(index)=>{
  const note=saved[index];
  if(!note)return;
  setSaved(prev=>prev.filter((_,i) => i!==index));
  try {
      await fetch(`http://localhost:5000/notes/${note.id}`, {
          "method": "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Archieve: true }),
      })
     
  }
  catch (error) {
      console.log(error);
  }
  }
  
  const updateNote = async (index, field, value) => {
    setSaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, [field]: value } : note
      )
    );

    const save = saved[index];
    if (!save) return;

    try {
      await fetch(`http://localhost:5000/notes/${save.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateColor = async (index, color) => {
    setSaved(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, bgcolor: color } : note
      )
    );

    const n = saved[index];
    if (!n) return;

    try {
      await fetch(`http://localhost:5000/notes/${n.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bgcolor: color }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleColorOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActiveIndex(index);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
    setActiveIndex(null);
  };

  return (
    <>
      {/* for grid view  */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
          mt: 7,
          ml: open ? 55 : 25,
          px: 3,
          width: "65%",
        }}
      >
        {saved.map((note, index) => (
          <Paper
            key={note.id}
            elevation={2}
            sx={{
              p: 2,
              backgroundColor: note.bgcolor,
              borderRadius: 2,
            }}
          >
            <TextareaAutosize
              placeholder="Title"
              value={note.title}
              onChange={(e) =>
                updateNote(index, "title", e.target.value)
              }
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "1.2rem",
                backgroundColor: "transparent",
                fontWeight: 500,
              }}
            />

            <TextareaAutosize
              placeholder="Take a note..."
              value={note.description}
              onChange={(e) =>
                updateNote(index, "description", e.target.value)
              }
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                backgroundColor: "transparent",
                marginTop: 8,
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >


              <Tooltip title="formatting options" sx={{ opacity: '1', cursor: 'pointer', pl: 0 }}>
                <IconButton>
                  <FormatColorTextOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Change color">
                <IconButton
                  onClick={(e) => handleColorOpen(e, index)}
                >
                  <ColorLensOutlinedIcon />
                </IconButton>
              </Tooltip><Tooltip title="remind me">
                <IconButton>
                  <AddAlertOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="collaborator">
                <IconButton>
                  <PersonAddAlt1OutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="add img">
                <IconButton>
                  <ImageOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="archive">
                <IconButton>
                  <ArchiveOutlinedIcon onClick={() => handleArchieve(index)} sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="delete">
                <IconButton>
                  <Deletebtn sx={{ pl: 1, pr: 1, cursor: 'pointer' }} onClick={() => handledelete(index)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="more options">
                <IconButton>
                  <MoreVertOutlinedIcon sx={{ textAlign: 'center', pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>

            </Box>
          </Paper>
        ))}
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ClickAwayListener onClickAway={handleColorClose}>
          <Box sx={{ display: "flex", p: 1 }}>
            {colors.map((color) => (
              <Box
                key={color}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: "pointer",
                  m: 0.5,
                  border: "1px solid #ccc",
                }}
                onClick={() => {
                  updateColor(activeIndex, color);
                  handleColorClose();
                }}
              />
            ))}
          </Box>
        </ClickAwayListener>
      </Popover>
    </>
  );
}