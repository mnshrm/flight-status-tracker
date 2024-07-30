import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import FlightContext from "../context/FlightContext";
import { useCallback, useContext, useState } from "react";
import { updateFlightStatus } from "../services/adminServices";
import CloseIcon from "@mui/icons-material/Close";

const Admin = () => {
  const { flights } = useContext(FlightContext);
  const [status, setStatus] = useState({ status: "", id: "" });
  const [open, setOpen] = useState(false);
  const updateStatus = () => {
    updateFlightStatus(status.id, status.status);
    setStatus({ status: "", id: "" });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = useCallback((id, ev) => {
    setStatus({ id: id, status: ev.target.value });
  }, []);

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={"Status updated"}
        action={action}
      />
      <Grid
        container
        spacing={2}
        gap={3}
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {flights.map((flight) => {
          return (
            <Card
              key={flight.id}
              sx={{ textAlign: "start", minWidth: "300px" }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/WFVSNTWHWJP5TFKQI2M3ESUIDM.jpg"
                title="indigo airplane"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {flight.from_city + " to " + flight.to_city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {flight.status}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "start",
                }}
              >
                <TextField
                  placeholder="Update"
                  fullWidth
                  size="small"
                  value={status.id === flight.id ? status.status : ""}
                  onChange={handleChange.bind(null, flight.id)}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginLeft: 0 }}
                  onClick={updateStatus.bind(null)}
                >
                  Update Status
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </>
  );
};

export default Admin;
