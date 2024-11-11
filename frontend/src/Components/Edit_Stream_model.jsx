import React, { useEffect, memo } from 'react';
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

const Edit_Stream_model = (props) => {
    const { handleClose, open, register, handleSubmit, setFormData, editData } = props
    const [openMenu, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [formObj, setFormObj] = useState({
        title: '',
        author: '',
        date: '',
        time: ''
    })
    const changleHandler = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        return setFormObj(preObj =>
        (
            {
                ...preObj,
                [name]: value
            }))
    }

    const [date, time] = editData?.dateAndTime?.length > 0 ? editData?.dateAndTime.split('T') : ''

    const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`
    const handleToggle = () => {
        setOpen((prev) => !prev);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (editData) {
            setFormObj({
                title: editData.title || '',
                author: editData.author || '',
                date: date || '',
                time: time || ''
            });
        }
    }, [editData]);



    const id = editData.stream_id
    const onSubmit = async () => {
        setFormData(formObj)
        try {
            let { date, time, ...restData } = formObj
            let dateAndTime = `${date}T${time}`

            const dataObj = dateAndTime.length > 0 ? { ...restData, dateAndTime } : { restData }

            const response = await axios.put(`${API_URL}/stream/edit-stream/${id}`, dataObj)
            console.log(response.data.message)
            if (response.status === 200) {
                setAlertSeverity('success');
                setAlertMessage(response.data.message);
            } else {

                throw new Error('Failed to update the meeting.');
            }
        } catch (error) {
            console.log(error)
            setAlertSeverity('error');
            setAlertMessage(error.message || 'Something went wrong!');

        } finally {
            setSnackbarOpen(true);
        }

    }

    return (
        <div>
            <Modal
                id='close-edit'
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
                            name='title'
                            label="Stream Title"
                            variant='standard'
                            {...register("title")}
                            value={formObj?.title}
                            onChange={changleHandler}
                        />
                        <TextField
                            name='author'
                            label="Join As"
                            variant='standard'
                            {...register("author")}
                            value={formObj.author}
                            onChange={changleHandler}
                        />

                        <div className='schedule__dropdown'>
                            <Button variant="contained" onClick={handleToggle}>
                                Schedule Stream
                            </Button>
                            <Collapse in={openMenu}>
                                <Box sx={{ mt: 2, p: 2, borderRadius: 1 }}>
                                    <div className='schedule__form'>
                                        <TextField
                                            name='date'
                                            variant='standard'
                                            type='date'
                                            {...register("date")}
                                            value={formObj.date}
                                            onChange={changleHandler}
                                        />
                                        <TextField
                                            name='time'
                                            variant='standard'
                                            type='time'
                                            {...register("time")}
                                            value={formObj?.time?.slice(0, 5)}
                                            onChange={changleHandler}
                                        />
                                        <Button type='submit' id='done' variant='contained'>Done</Button>
                                    </div>
                                </Box>
                            </Collapse>
                        </div>
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

export default memo(Edit_Stream_model)