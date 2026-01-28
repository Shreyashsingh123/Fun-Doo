import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { TextareaAutosize, Tooltip } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Deletebtn from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { useDrawer } from './Side-Bar-Context';
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function List_view({ saved, setSaved }) {

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

    const { open } = useDrawer();


    const [anchorEl, setAnchorEl] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const Noteupdate = async (index, field, value) => {
        setSaved(prev =>
            prev.map((note, i) =>
                i === index ? { ...note, [field]: value } : note
            )
        )
        const save = saved[index];
        if (!save) return;
        try {
            await fetch(`http://localhost:5000/notes/${save.id}`, {
                "method": "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [field]: value }),
            })
            console.log(saved)
        }
        catch (error) {
            console.log(error);
        }
    };
const handledelete=async(index)=>{
    const note = saved[index];
    if (!note) return;
    setSaved(prev=>prev.filter((_,i) => i!==index));
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
    const Colorupdate = async (index, color) => {
        setSaved(prev =>
            prev.map((note, i) =>
                i === index ? { ...note, bgcolor: color } : note
            )
        )
        const save = saved[index];
        if (!save) return;
        try {
            await fetch(`http://localhost:5000/notes/${save.id}`, {
                "method": "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bgcolor: color }),
            })
            console.log(saved)
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleColorOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setActiveIndex(index);
    }

    const handleColorClose = () => {
        setAnchorEl(null);
        setActiveIndex(null);
    }

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

    return (
        <>
            {saved.map((note, index) => (
                <Paper
                key={note.id}
                    elevation={2}
                    sx={{
                        p: 1,
                        boxSizing: "border-box",
                        backgroundColor: note.bgcolor,
                        position: 'relative',
                        mt: 4,
                        ml: open ? 60 : 38,
                        width: '40%'

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
                                    Noteupdate(index, 'title', e.target.value)
                                }
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <PushPinOutlinedIcon />
                            </div>
                        </div>

                        <TextareaAutosize
                            aria-label="note content"
                            placeholder="Take a note.."
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
                                Noteupdate(index, 'description', e.target.value)
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

                            <Tooltip title="formatting options" sx={{ opacity: '1', cursor: 'pointer', pl: 0 }}>
                                <IconButton>
                                    <FormatColorTextOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="change color">
                                <IconButton >
                                    <ColorLensOutlinedIcon sx={{ cursor: 'pointer', pl: 1, pr: 1 }} onClick={(e) => handleColorOpen(e, index)} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="remind me">
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
                                    <ArchiveOutlinedIcon onClick={()=>handleArchieve(index)}  sx={{ pl: 1, pr: 1, cursor: 'pointer' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="delete">
                                <IconButton>
                                    <Deletebtn sx={{ pl: 1, pr: 1, cursor: 'pointer' }} onClick={()=>handledelete(index)}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="more option">
                                <IconButton>
                                    <MoreVertOutlinedIcon sx={{ textAlign: 'center', pl: 1, pr: 1, cursor: 'pointer' }} />
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
                                                Colorupdate(activeIndex, color);
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