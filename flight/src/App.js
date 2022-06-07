import { Home } from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flights } from "./screens/Flights";
import { AdminLayout } from "./components/admin-layout";
import { AddAirplane } from "./screens/Admin/airplane";
import { AddCompany } from "./screens/Admin/addcompany";
import { AddAircraft } from "./screens/Admin/aircraft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddExpedition } from "./screens/Admin/addExpedition";
import { Checkout } from "./screens/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/flights/:date" element={<Flights />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AddAirplane />} />
          <Route path="addCompany" element={<AddCompany />} />
          <Route path="addAircraft" element={<AddAircraft />} />
          <Route path="addExpedition" element={<AddExpedition />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </BrowserRouter>
  );
}

export default App;
