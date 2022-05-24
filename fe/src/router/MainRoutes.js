import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";

const MainRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/appointments" element={<Home />} />
      <Route path="/contact" element={<Home />} />
      <Route path="/account" element={<Home />} />
    </Routes>
  );
};

export default MainRoutes;
