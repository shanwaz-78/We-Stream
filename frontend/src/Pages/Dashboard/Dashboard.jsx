import React, { useState } from 'react';
import './Dashboard.css'
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
import Dashboard_Comp from '../../Components/Dashboard_Comp';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Dashboard = () => {
    const [tabValue, setTabValue] = useState('1');
    const [value, setValue] = useState(1);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return (
        <div className='dashboard'>
            <header className='dsb-header'>
                <nav>
                    <h1>weStream</h1>
                    <Button variant='outlined'>My Account</Button>
                </nav>
            </header>
            <div className='dsb-section'>
               {value === 1? <Dashboard_Comp tabValue={tabValue} handleTabChange={handleTabChange} />:''}
               {value === 2? <Dashboard_Comp tabValue={tabValue} handleTabChange={handleTabChange} />:''}
                <div className='right-section'>
                    <Button variant="text" onClick={() => setValue(1)}>Home</Button>
                    <Button variant="text" onClick={() => setValue(2)}>Members</Button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
