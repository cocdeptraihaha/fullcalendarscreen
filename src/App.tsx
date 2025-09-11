import Header from "./components/header";

import Calendar from "./components/calendar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Contacts from "./components/contacts/Contacts";

function App() {
  const activeSection =useSelector((state: RootState) => state.header.section)
  return (
    <>
      <Header></Header>
       {activeSection === "Calendar" && <Calendar />}
       {activeSection === "Contacts" && <Contacts/>}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
