import { BrowserRouter } from "react-router-dom";
import AppointmentButton from "./components/AppointmentButton/AppointmentButton";
import Header from "./components/Header/Header";
import { AuthProvider } from "./provider/Auth";
import MainRoutes from "./router/MainRoutes";
import { PopulatorProvider } from "./provider/Populator";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PopulatorProvider>
          <Header />
          <MainRoutes />
          <AppointmentButton />
        </PopulatorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
