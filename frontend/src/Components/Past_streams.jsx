import React, { useEffect, useState } from 'react'
import {
    Box,
    Tab,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import axios from 'axios';

function Past_streams() {
    const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`
    const [pastStreams, setPastStreams] = useState([])


    const getPastStreams = async () => {
        try{
            const {data} = await axios.get(`${API_URL}/stream/get-past-streams`)
            setPastStreams(data.data)
           
        }catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        getPastStreams()
    },[])
    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 440,
                    overflowY: "auto",
                    overflowX: "auto",
                    width: "100%",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Date and Time</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pastStreams.length ? (
                            pastStreams.map((stream) => (
                                <TableRow key={stream.stream_id}>
                                    <TableCell align="center">{stream.title}</TableCell>
                                    <TableCell align="center">{stream.author}</TableCell>
                                    <TableCell align="center">
                                        {new Date(stream.dateAndTime).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">

                                        {/* <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{
                                                ml: 1,
                                                fontSize: { xs: "0.5rem", sm: "0.7rem" },
                                            }}
                                            onClick={() => deleteStream(stream.stream_id)}
                                        >
                                            Delete
                                        </Button> */}

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No upcoming streams
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Past_streams
