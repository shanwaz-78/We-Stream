import React, { useEffect, useState } from "react";
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
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Add } from "@mui/icons-material";
import RadioButtonCheckedSharpIcon from "@mui/icons-material/RadioButtonCheckedSharp";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Stream_Model from "./Stream_Modal";
import { useForm } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard_Comp({ handleTabChange, tabValue }) {
  const [open, setOpen] = useState(false);
  const [scheduledStream, setScheduledStream] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getAllMeetings = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/stream/get-streams`);
      if (data) setScheduledStream(data.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  useEffect(() => {
    getAllMeetings();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="left-section">
      <Stream_Model
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        handleClose={handleClose}
        open={open}
      />
      <div className="dsb-btn-cont">
        <Button
          className="dsb-btn"
          variant="outlined"
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
            minWidth: "auto",
          }}
        >
          <VideocamOutlinedIcon
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
          Live Stream
          <Add
            className="add-icon"
            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
          />
        </Button>
        <Button
          className="dsb-btn"
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
            minWidth: "auto",
          }}
        >
          <RadioButtonCheckedSharpIcon
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
          Recording
          <Add
            className="add-icon"
            sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
          />
        </Button>
      </div>
      <Box sx={{ width: "100%", height: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Upcoming" value="1" />
              <Tab label="Past" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                  {scheduledStream.length ? (
                    scheduledStream.map((stream) => (
                      <TableRow key={stream.stream_id}>
                        <TableCell align="center">{stream.title}</TableCell>
                        <TableCell align="center">{stream.author}</TableCell>
                        <TableCell align="center">
                          {new Date(stream.dateAndTime).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                              fontSize: {
                                xs: "0.5rem",
                                sm: "0.7rem",
                              },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                              ml: 1,
                              fontSize: { xs: "0.5rem", sm: "0.7rem" },
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                              ml: 1,
                              fontSize: { xs: "0.5 rem", sm: "0.7rem" },
                            }}
                          >
                            Complete
                          </Button>
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
          </TabPanel>
          <TabPanel value="2">There is no stream history</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Dashboard_Comp;
