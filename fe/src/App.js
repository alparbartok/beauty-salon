import { BrowserRouter } from "react-router-dom";
import AppointmentButton from "./components/AppointmentButton/AppointmentButton";
import Header from "./components/Header/Header";
import MainRoutes from "./router/MainRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainRoutes />
      <AppointmentButton />
    </BrowserRouter>
  );
};

export default App;
