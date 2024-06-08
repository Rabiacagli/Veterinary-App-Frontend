import "./App.css";
import {Route, Routes} from "react-router-dom"
import Animal from "./Pages/Animal/Animal";
import Appointment from "./Pages/Appointment/Appointment";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Report from "./Pages/Report/Report";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/animal" element={<Animal />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/doctor" element={<Doctor />} >
          <Route index = {true} element = {<AvailableDate/>}/>
        </Route>
        <Route path="/report" element={<Report />} />
        <Route path="/vaccine" element={<Vaccine />} />
      </Routes>
    </>
  );
}

export default App;
