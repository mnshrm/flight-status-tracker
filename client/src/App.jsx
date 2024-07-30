import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flights from "./pages/Flights";
import Admin from "./pages/Admin";
import { FlightProvider } from "./context/FlightContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Flights />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  return (
    <FlightProvider>
      <RouterProvider router={router} />
    </FlightProvider>
  );
}

export default App;
