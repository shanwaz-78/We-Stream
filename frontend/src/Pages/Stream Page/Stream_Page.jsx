import React, { useState, useEffect, useRef } from "react";
import "./Stream_page.css";
import { io } from "socket.io-client";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Mic,
  Videocam,
  Stop,
  Favorite,
  Person,
  Send,
  ScreenShare,
  StopScreenShare,
} from "@mui/icons-material";

function Stream_Page() {
  const [likeCount, setLikeCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [combinedStream, setCombinedStream] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  socketRef.current = io("http://localhost:3000");

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const startScreenShare = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (isWebcamActive && combinedStream) {
        displayStream.getTracks().forEach((track) => {
          combinedStream.addTrack(track);
        });
      } else {
        setCombinedStream(displayStream);
        videoRef.current.srcObject = displayStream;
      }

      setIsScreenSharing(true);

      displayStream.getVideoTracks()[0].onended = () => stopScreenShare();
    } catch (error) {
      console.error("Error starting screen share:", error);
    }
  };

  const startWebcam = async () => {
    try {
      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (isScreenSharing && combinedStream) {
        webcamStream.getTracks().forEach((track) => {
          combinedStream.addTrack(track);
        });
      } else {
        setCombinedStream(webcamStream);
        videoRef.current.srcObject = webcamStream;
      }

      setIsWebcamActive(true);
    } catch (error) {
      console.error("Error starting webcam:", error);
    }
  };

  const stopScreenShare = () => {
    if (combinedStream) {
      const screenTracks = combinedStream
        .getTracks()
        .filter(
          (track) => track.kind === "video" && track.label.includes("screen")
        );
      screenTracks.forEach((track) => track.stop());

      const remainingTracks = combinedStream
        .getTracks()
        .filter((track) => !screenTracks.includes(track));
      const newStream = new MediaStream(remainingTracks);

      if (remainingTracks.length > 0) {
        setCombinedStream(newStream);
        videoRef.current.srcObject = newStream;
      } else {
        setCombinedStream(null);
        videoRef.current.srcObject = null;
      }
    }

    setIsScreenSharing(false);
  };

  const stopWebcam = () => {
    if (combinedStream) {
      const webcamTracks = combinedStream
        .getTracks()
        .filter(
          (track) => track.kind === "video" && !track.label.includes("screen")
        );
      webcamTracks.forEach((track) => track.stop());

      const remainingTracks = combinedStream
        .getTracks()
        .filter((track) => !webcamTracks.includes(track));
      const newStream = new MediaStream(remainingTracks);

      if (remainingTracks.length > 0) {
        setCombinedStream(newStream);
        videoRef.current.srcObject = newStream;
      } else {
        setCombinedStream(null);
        videoRef.current.srcObject = null;
      }
    }

    setIsWebcamActive(false);
  };

useEffect(() => {
  socketRef.current = io("http://localhost:3000");
  socketRef.current.emit("new-user-joined", "Guest");

  socketRef.current.on("active-users", (users) => {
    setActiveUsers(users);
  });

  socketRef.current.on("receive", (msg) => {
    setMsgs((prevMsgs) => [...prevMsgs, msg]);
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);

  const hanldeKeyPress = (e) => {
    const eachPressedKey = e.key;
    if (eachPressedKey === "enter" || eachPressedKey === "Enter") {
      socketRef.current.emit("send", msg);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#121212",
      }}
    >
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
        <Typography variant="h6">🚀 Live Now</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="caption"
            sx={{ pr: 2, display: "flex", alignItems: "center" }}
          >
            <Person sx={{ mr: 0.5 }} /> {activeUsers}
          </Typography>
          <IconButton
            onClick={handleLikeClick}
            sx={{ color: liked ? "red" : "#fff" }}
            aria-label="Like"
          >
            <Favorite />
          </IconButton>
          <Typography variant="caption" sx={{ pl: 1 }}>
            {likeCount}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container sx={{ flex: 1, display: "flex" }}>
        <Grid item xs={12} md={8} sx={{ p: 2 }}>
          <Paper elevation={3} sx={{ height: "100%", bgcolor: "#000" }}>
            <video
              ref={videoRef}
              autoPlay
              style={{ width: "100%", height: "100%" }}
              aria-label="Live Stream Video"
            />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{ p: 2, bgcolor: "#1c1c1c", color: "#fff" }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Live Chat
          </Typography>
          <Box
            sx={{
              height: "70%",
              overflowY: "auto",
              mb: 2,
              p: 1,
              border: "1px solid #333",
            }}
          >
            {msgs.map((msg) => {
              <Typography variant="body2">{msg}</Typography>;
            })}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              sx={{ bgcolor: "#fff" }}
              onKeyPress={hanldeKeyPress}
              onChange={(e) => setMsg(e.target.value)}
            />
            <IconButton sx={{ color: "#4caf50" }} aria-label="Send Message">
              <Send />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          p: 2,
          bgcolor: "#212121",
          color: "#fff",
        }}
      >
        {!isWebcamActive ? (
          <IconButton
            onClick={startWebcam}
            sx={{ color: "#fff" }}
            aria-label="Toggle Webcam"
          >
            <Videocam />
          </IconButton>
        ) : (
          <IconButton
            onClick={stopWebcam}
            sx={{ color: "#ff5252" }}
            aria-label="Stop Webcam"
          >
            <Videocam />
          </IconButton>
        )}
        {!isScreenSharing ? (
          <IconButton
            onClick={startScreenShare}
            sx={{ color: "#fff" }}
            aria-label="Start Screen Share"
          >
            <ScreenShare />
          </IconButton>
        ) : (
          <IconButton
            onClick={stopScreenShare}
            sx={{ color: "#ff5252" }}
            aria-label="Stop Screen Share"
          >
            <StopScreenShare />
          </IconButton>
        )}
        <Button
          variant="contained"
          color="error"
          startIcon={<Stop />}
          aria-label="End Stream"
          onClick={() => {
            stopWebcam();
            stopScreenShare();
          }}
        >
          End Stream
        </Button>
      </Box>
    </Box>
  );
}

export default Stream_Page;
