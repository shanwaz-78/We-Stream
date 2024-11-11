import React, { useState } from 'react'
import './Stream_page.css'
import { Box, Typography, Paper, Button, Grid2, TextField, IconButton } from "@mui/material";
import { Mic, Videocam, Stop, Favorite, Person, Send } from "@mui/icons-material";
import { green } from "@mui/material/colors"


function Stream_Page() {
    const [likeCount, setLikeCount] = useState(1200);
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#121212" }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    bgcolor: "#212121",
                    color: "#fff",
                }}
            >
                <Typography variant="h6">🚀 Rocket launch today</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption" sx={{ pr: 2, display: "flex", alignItems: "center" }}>
                        <Person sx={{ mr: 0.5 }} /> 458K
                    </Typography>
                    <Typography variant="caption" sx={{ pr: 2, display: "flex", alignItems: "center" }}>
                        💬 250
                    </Typography>
                    <IconButton onClick={handleLikeClick} sx={{ color: liked ? "red" : "#fff" }}>
                        <Favorite />
                    </IconButton>
                    <Typography variant="caption" sx={{ pl: 1 }}>
                        {likeCount}
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            <Grid2 container sx={{ flex: 1, display: 'flex' }}>
                {/* Video Section - 70% */}
                <Grid2 item xs={8.4} sx={{ p: 2, width: "70%" }}>
                    <Paper elevation={3} sx={{ height: "100%", bgcolor: "#000" }}>
                        <video
                            src="video-url.mp4" // Replace with actual video URL
                            controls
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Paper>
                </Grid2>

                {/* Chat Section*/}
                <Grid2 item xs={3.6} sx={{ p: 2, width: "30%", bgcolor: "#1c1c1c", color: "#fff" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Live Chat</Typography>
                    <Box
                        sx={{
                            height: "75%",
                            overflowY: "scroll",
                            mb: 2,
                            p: 1,
                            border: "1px solid #333",
                        }}
                    >
                        {/* Chat Messages  */}
                        <Typography>🚀 Rocket Time: It is -70s and clear...</Typography>
                        <Typography>🧑‍🚀 Space Cadet: Not to be that guy...</Typography>
                    </Box>
                    <TextField fullWidth variant="outlined" placeholder="Type a message..." sx={{ bgcolor: "#fff", position: "relative" }} >
                        <Send style={{
                            position: "absolute",
                            bottom: "50%",
                            right:"0",
                            transform:"transition(0,-50%)",
                            color:green[500]
                        }}
                        />
                    </TextField>
                </Grid2>
            </Grid2>

            {/* Footer Controls */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                p: 2,
                bgcolor: "#212121",
                color: "#fff",
            }} >
                <IconButton sx={{ color: "#fff" }}>
                    <Mic />
                </IconButton>
                <IconButton sx={{ color: "#fff" }}>
                    <Videocam />
                </IconButton>
                <Button variant="contained" color="error" startIcon={<Stop />}>
                    End Stream
                </Button>
            </Box>
        </Box>
    );
}

export default Stream_Page
