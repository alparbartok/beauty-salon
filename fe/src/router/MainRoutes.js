import { Route, Routes } from "react-router-dom";
import { Account } from "../components/Account/Account";
import { Appointments } from "../components/Appointments";
import Home from "../components/Home/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/appointments/:code" element={<Appointments />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
};

export default MainRoutes;
