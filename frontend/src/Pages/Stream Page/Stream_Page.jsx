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
import { useUser } from "../../Context/UserContext";

function Stream_Page() {
  const [likeCount, setLikeCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [combinedStream, setCombinedStream] = useState(null);
  const [trackList, setTrackList] = useState(new MediaStream());
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const { user } = useUser();

  const videoRef = useRef(null);
  const socketRef = useRef(null);

  

  const handleLikeClick = () => {
    let updatedLike = liked ? likeCount - 1 : likeCount + 1;
    setLiked((prevLiked) => !prevLiked);
    setLikeCount(updatedLike);
    socketRef.current.emit("setLikes", updatedLike);
  };

  const startScreenShare = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const tracks = displayStream;
      const trackIds = tracks.getTracks().map((track) => track.id);
      setTrackList(tracks);

      videoRef.current.srcObject = displayStream;
      setIsScreenSharing(true);

      socketRef.current.emit("setStream", trackIds);

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
        socketRef.current.emit("setStream", webcamStream.getTracks().map((track) => track.id));
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

    socketRef.current.emit("new-user-joined", user || "Guest");

    socketRef.current.on("active-users", (users) => {
      setActiveUsers(users);
    });

    socketRef.current.on("receive", (msg) => {
      setMsgs((prevMsgs) => [...prevMsgs, msg]);
    });

    socketRef.current.on("getLikes", (num) => {
      setLikeCount(num);
    });

    socketRef.current.on("getStream", async (trackIds) => {
      console.log("Received track IDs:", trackIds);

      try {
        const streamTracks = trackIds.map((trackId) => {
          const track = trackList.getTracks().find((t) => t.id === trackId);
          if (!track) {
            throw new Error(`Track with ID ${trackId} not found`);
          }
          return track;
        });

        const reconstructedStream = new MediaStream(streamTracks);
        videoRef.current.srcObject = reconstructedStream;
      } catch (error) {
        console.error("Error reconstructing stream:", error);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [msgs, likeCount, trackList, user]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      socketRef.current.emit("send", msg);
      setMsg("");
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
              height: "550px", // Fixed height
              overflowY: "auto", // Enable scrolling
              mb: 2,
              p: 2,
              border: "1px solid #444",
              borderRadius: "8px",
              bgcolor: "#1e1e1e",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {msgs.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 3,
                  p: 2,
                  bgcolor: "#2a2a2a",
                  borderRadius: "12px",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "#4caf50",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {msg.username ? msg.username.charAt(0).toUpperCase() : "G"}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                      {msg.username || "Guest"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#bbb" }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                    {msg.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              sx={{ bgcolor: "#fff" }}
              onKeyPress={handleKeyPress}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <IconButton
              sx={{ color: "#4caf50" }}
              onClick={() => {
                socketRef.current.emit("send", msg);
                setMsg("");
              }}
            >
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