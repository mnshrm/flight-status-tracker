import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import FlightContext from "../context/FlightContext";
import { bookUserFlight } from "../services/userServices";
import CloseIcon from "@mui/icons-material/Close";

const Flights = () => {
  const { flights } = useContext(FlightContext);
  const [open, setOpen] = useState(false);

  const bookFlight = async (id) => {
    await bookUserFlight(id);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
        message={"Flight Booked"}
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
              sx={{ textAlign: "start", minWidth: "200px" }}
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
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  onClick={bookFlight.bind(null, flight.id)}
                  disabled={flight.booked}
                >
                  {flight.booked ? "Booked" : "Book flight"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </>
  );
};

export default Flights;
