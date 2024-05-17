import Home from "./components/home";
import Apartments from "./components/apartments";
import React from "react";
import Reservation from './components/reservation';
import ReservationPage from './components/reservationPage';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartments/:id" element={<Apartments />} />
          <Route path="/apartments/:id/reservation/:intervalStart/:intervalEnd/:price/:persons" element={<Reservation />} />
          <Route path="/reservationPage/:id" element={<ReservationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
