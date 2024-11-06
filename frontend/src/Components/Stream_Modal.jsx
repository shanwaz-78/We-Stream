import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Height } from '@mui/icons-material';
import { TextField, Button, Collapse } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "auto",
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: "5px",
    boxShadow: 24,
    padding: '14px',
    display:"flex",
    flexDirection:"column",
    gap:"5px"
};

export default function Stream_Model(props) {
    const { handleClose, open } = props
    const [openMenu, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <Typography id="modal-modal-title" variant="h7" component="h4">
                        Create Live Stream
                    </Typography>
                    <div className='stream__form'>
                        <TextField
                            label="Stream Title"
                            variant='standard'
                        />
                        <TextField
                            label="Join As"
                            variant='standard'
                        />

                        <div className='schedule__dropdown'>
                            <Button variant="contained" onClick={handleToggle}>
                               Schedule Stream
                            </Button>
                            <Collapse in={openMenu}>
                                <Box sx={{ mt: 2, p: 2, borderRadius: 1 }}>
                                    <div className='schedule__form'>
                                        <TextField variant='standard' type='date' />
                                        <TextField variant='standard' type='time' />
                                        <Button variant='contained'>Done</Button>
                                    </div>
                                </Box>
                            </Collapse>
                        </div>
                        <Button variant='contained' >Instant Stream</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
