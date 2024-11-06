import React from 'react'
import {
    Box,
    Tabs,
    Tab,
    Button,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Add } from '@mui/icons-material'
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Stream_Model from './Stream_Modal';



function Dashboard_Comp(props) {
    const { handleTabChange, tabValue } = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='left-section'>
            <Stream_Model handleClose={handleClose} open={open} />
            <div className='dsb-btn-cont'>
                <Button
                    className='dsb-btn'
                    variant="outlined"
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    }}
                    onClick={handleOpen}
                >
                    <span>
                        <VideocamOutlinedIcon />
                        Live Stream
                    </span>
                    <Add className='add-icon' />
                </Button>
                <Button
                    className='dsb-btn'
                    variant="outlined"
                    sx={{
                        position: 'relative',
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    }}
                >
                    <span>
                        <RadioButtonCheckedSharpIcon />
                        Recording
                    </span>
                    <Add className='add-icon' />
                </Button>
            </div>
            <Box sx={{ width: '100%', height: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Upcoming" value="1" />
                            <Tab label="past" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><p>no upcoming stream</p></TabPanel>
                    <TabPanel value="2"> there is no stream history</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default Dashboard_Comp
