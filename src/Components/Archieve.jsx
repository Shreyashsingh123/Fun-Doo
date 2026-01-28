import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function Archieve() {
  const [activeIndex, setActiveIndex] = React.useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(null);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = user?.id;

  const colors = [
    "#ffffff",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#d7aefb"
  ];

  useEffect(() => {
    if (!user) return;
    const fetchnotes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/notes?userId=${user.id}&Archieve=true&Trash=false`);
        const data = await res.json();
        console.log(data);
        setActiveIndex(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchnotes();
  }, [userId]);

  const handleClick = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PATCH",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ Archieve: false }),

      })

      setActiveIndex(prev => prev.filter(note => note.id !== id));
      console.log("Note restored successfully");

    }
    catch (error) {
      console.log(error);
    }

  }

  const updateNote = async (index, field, value) => {
    setActiveIndex(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, [field]: value } : note
      )
    )
    const save = activeIndex[index];
    if (!save) return;
    try {
      await fetch(`http://localhost:5000/notes/${save.id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      console.log("saved successfully");
    }
    catch (error) {
      console.log(error);
    }
  };

  const Colorupdate = async (index, color) => {
    setActiveIndex(prev =>
      prev.map((note, i) =>
        i === index ? { ...note, bgcolor: color } : note
      )
    )
    const save = activeIndex[index];
    if (!save) return;
    try {
      await fetch(`http://localhost:5000/notes/${save.id}`, {
        "method": "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bgcolor: color }),
      })
      console.log("Color updated successfully");
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleColorOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActive(index);
  }

  const handleColorClose = () => {
    setAnchorEl(null);
    setActive(null);
  }

  return (
    <>
      {activeIndex.map((note, index) => (
        <Paper
          key={note.id}
          elevation={2}
          sx={{
            p: 1,
            boxSizing: "border-box",
            backgroundColor: note.bgcolor,
            position: 'relative',
            mt: 5,
            ml: open ? 60 : 38,
            width: '48%'

          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <TextareaAutosize
                aria-label="note title"
                placeholder="Title"
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1.5rem',
                  marginBottom: '10px',
                  backgroundColor: "transparent"
                }}
                value={note.title}
                onChange={(e) =>
                  updateNote(index, 'title', e.target.value)
                }
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px',marginRight:'10px' }}>
                <PushPinOutlinedIcon />
              </div>


            </div>

            <TextareaAutosize
              aria-label="note content"
              placeholder="Take a note..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '1rem',
                resize: 'none',
                backgroundColor: "transparent"
              }}
              value={note.description}
              onChange={(e) =>
                updateNote(index, 'description', e.target.value)
              }
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                marginTop: "10px",
              }}
            >
              <Tooltip title="Change color">
                <IconButton >
                  <ColorLensOutlinedIcon sx={{ cursor: 'pointer', pl: 1, pr: 1 }} onClick={(e) => handleColorOpen(e, index)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remind">
                <IconButton>
                  <AddAlertOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Collaborator">
                <IconButton>
                  <PersonAddAlt1OutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add img">
                <IconButton>
                  <ImageOutlinedIcon sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="UnArchive">
                <IconButton>
                  <ArchiveOutlinedIcon onClick={() => handleClick(note.id)} />
                </IconButton>
              </Tooltip>

            </div>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{
                mt: 1,
                ml: 20,
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
                        Colorupdate(active, color);
                        handleColorClose();
                      }}
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            </Popover>
          </Box>
        </Paper>

      ))}
    </>
  )
}
