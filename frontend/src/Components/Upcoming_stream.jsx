import React from "react";
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
import Edit_Stream_model from "./Edit_Stream_model";
import axios from "axios";

function Upcoming_stream(props) {
  const {
    openEditModel,
    scheduledStream,
    deleteStream,
    handleEditClose,
    handleEditOpen,
    editData,
    setFormData,
    handleSubmit,
    register,
    errors,
  } = props;

  const API_URL = import.meta.env.VITE_API_URL || `http://localhost:3000`;
  const handleComplete = async (id) => {
    try {
      const { response } = await axios.post(
        `${API_URL}/stream/complete-stream/${id}`
      );
      const nonCompletedStream = scheduledStream.filter(({stream_id}) => stream_id !== id);
      setFormData(nonCompletedStream);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Edit_Stream_model
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        handleClose={handleEditClose}
        open={openEditModel}
        editData={editData}
        setFormData={setFormData}
      />
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
                      id="open-edit"
                      variant="outlined"
                      color="primary"
                      sx={{
                        fontSize: {
                          xs: "0.5rem",
                          sm: "0.7rem",
                        },
                      }}
                      onClick={() => handleEditOpen(stream.stream_id)}
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
                      onClick={() => deleteStream(stream.stream_id)}
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
                      onClick={() => handleComplete(stream.stream_id)}
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
    </>
  );
}

export default Upcoming_stream;
