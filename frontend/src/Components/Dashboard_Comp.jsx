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
import Edit_Stream_model from "./Edit_Stream_model";
import Upcoming_stream from "./Upcoming_stream";
import Past_streams from "./Past_streams";

const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`;

function Dashboard_Comp({ handleTabChange, tabValue }) {
  const [open, setOpen] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState({});
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

  const deleteStream = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/stream/delete-stream/${id}`);
      const removedStream = scheduledStream.filter(
        ({ stream_id }) => stream_id !== id
      );
      setFormData(removedStream);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMeetings();
  }, [formData]);

  const handleOpen = () => setOpen(true);
  const handleEditOpen = (id) => {
    console.log(id);
    const item = scheduledStream.find((item) => item.stream_id === id);
    console.log(item);
    setEditData(item);
    setOpenEditModel(true);
  };
  const handleClose = () => setOpen(false);
  const handleEditClose = () => {
    setOpenEditModel(false);
    setEditData({});
  };

  return (
    <div className="left-section">
      <Stream_Model
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        handleClose={handleClose}
        open={open}
        setFormData={setFormData}
      />
      <div className="dsb-btn-cont">
        <Button
          id="open"
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
            <Upcoming_stream
              deleteStream={deleteStream}
              openEditModel={openEditModel}
              handleEditOpen={handleEditOpen}
              scheduledStream={scheduledStream}
              handleEditClose={handleEditClose}
              handleSubmit={handleSubmit}
              register={register}
              error={errors}
              editData={editData}
              setFormData={setFormData}
            />
          </TabPanel>
          <TabPanel value="2">
            <Past_streams />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default Dashboard_Comp;
