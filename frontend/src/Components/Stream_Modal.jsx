import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, Button, Collapse, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

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
    display: "flex",
    flexDirection: "column",
    gap: "5px"
};

export default function Stream_Model(props) {
    const { handleClose, open, register, handleSubmit } = props
    const [openMenu, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' or 'error'
    const [alertMessage, setAlertMessage] = useState('');


    const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`

    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (data) => {
        try {
            let { date, time, ...restData } = data
            let dateTime = `${date}T${time}`

            const dataObj = dateTime.length > 0 ? { ...restData, dateTime } : { restData }

            const response = await axios.post(`${API_URL}/meeting/schedule`, dataObj)
            console.log(response.data.message)
            if (response.status === 201) {
                setAlertSeverity('success');
                setAlertMessage(response.data.message);
            } else {
                throw new Error('Failed to schedule the meeting.');
            }
        } catch (error) {
            setAlertSeverity('error');
            setAlertMessage(error.message || 'Something went wrong!');
        } finally {
            setSnackbarOpen(true);
        }

    }

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
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='true' className='stream__form'>
                        <TextField
                            label="Stream Title"
                            variant='standard'
                            {...register("title")}
                        />
                        <TextField
                            label="Join As"
                            variant='standard'
                            {...register("author")}
                        />

                        <div className='schedule__dropdown'>
                            <Button variant="contained" onClick={handleToggle}>
                                Schedule Stream
                            </Button>
                            <Collapse in={openMenu}>
                                <Box sx={{ mt: 2, p: 2, borderRadius: 1 }}>
                                    <div className='schedule__form'>
                                        <TextField variant='standard' type='date' {...register("date")} />
                                        <TextField variant='standard' type='time' {...register("time")} />
                                        <Button type='submit' id='done' variant='contained'>Done</Button>
                                    </div>
                                </Box>
                            </Collapse>
                        </div>
                        <Button type='submit' id='instStream' variant='contained' >Instant Stream</Button>
                    </form>
                </div>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
