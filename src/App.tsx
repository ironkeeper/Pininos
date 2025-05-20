import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Layout from "./layouts/Layout";
import Articulos from "./components/Articulos";
import Calendario from "./components/Calendario";



export default function App() {
  return (

   <BrowserRouter>
   <ToastContainer />
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/articulos" element={<Articulos />} />
      <Route path="/calendario" element={<Calendario />} />
      </Route>
      </Routes>
   </BrowserRouter>
  )
}
