import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header";
import Calendar from "./components/calendar";
import Contacts from "./components/contacts/Contacts";
import Inbox from "./components/sections/Inbox";
import Forms from "./components/sections/Forms";
import Billing from "./components/sections/Billing";
import Marketing from "./components/sections/Marketing";
import Reports from "./components/sections/Reports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/calendar" replace />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
