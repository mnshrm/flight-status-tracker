import { createContext, useEffect, useReducer } from "react";
import { socket } from "../services/socketService";
import { getFlightData } from "../services/userServices";

const FlightContext = createContext([]);

const flightReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_FLIGHTS":
      return [...action.payload];
    case "FLIGHT_BOOKED":
      return state.map((flight) => {
        if (flight.id === action.payload.id) return action.payload;
        else return flight;
      });
    case "UPDATE_FLIGHT_STATUS":
      return state.map((flight) =>
        flight.id === action.payload.id ? action.payload : flight
      );
    case "ADD_FLIGHT":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const FlightProvider = ({ children }) => {
  const [flights, dispatch] = useReducer(flightReducer, []);

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getFlightData();
      dispatch({ type: "FETCH_FLIGHTS", payload: flights });
    };

    fetchData();
  }, []);

  useEffect(() => {
    socket.on("flight_status_updated", (updatedFlight) => {
      dispatch({ type: "UPDATE_FLIGHT_STATUS", payload: updatedFlight });
    });

    socket.on("flight_booked", (bookedFlight) => {
      dispatch({ type: "FLIGHT_BOOKED", payload: bookedFlight });
    });

    socket.on("flight_added", (newFlight) => {
      dispatch({ type: "ADD_FLIGHT", payload: newFlight });
    });

    return () => {
      socket.off("flight_status_updated");
      socket.off("flight_added");
    };
  }, [flights]);

  return (
    <FlightContext.Provider value={{ flights }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightContext;
