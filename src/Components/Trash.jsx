import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/RestoreFromTrash';
import Deletefrv from '@mui/icons-material/DeleteForeverOutlined';

function Trash() {
  const [activeIndex, setActiveIndex] = React.useState([]);
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userId = user?.id;
  useEffect(() => {
    if (!user) return;
    const fetchnotes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/notes?userId=${user.id}&Archieve=false&Trash=true`);
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
        body: JSON.stringify({ Trash: false }),

      })

      setActiveIndex(prev => prev.filter(note => note.id !== id));
      console.log("Note restored successfully");

    }
    catch (error) {
      console.log(error);
    }

  }

  const permanentDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }
      setActiveIndex(prev => prev.filter(note => note.id !== id));
      console.log("Note deleted permanently");
    }
    catch (error) {
      console.log(error);
    }
  };

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
               paddingLeft:"5px"
              }}
            >
              <Tooltip title="Delete Forever">
                <IconButton onClick={() => permanentDelete(note.id)}>
                  <Deletefrv />
                </IconButton>
              </Tooltip>
              <Tooltip title="Restore">
                <IconButton>
                  <DeleteOutlineOutlinedIcon onClick={() => handleClick(note.id)} />
                </IconButton>
              </Tooltip>

            </div>
          </Box>
        </Paper>

      ))}
    </>

  )
}
export default Trash;
