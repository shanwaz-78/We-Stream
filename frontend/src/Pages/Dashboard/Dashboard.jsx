import React, { useState } from 'react';
import './Dashboard.css'
import {Button} from '@mui/material';
import Dashboard_Comp from '../../Components/Dashboard_Comp';


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
