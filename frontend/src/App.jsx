import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 style={{padding: '60px', textAlign: "center" }}> Página Inicial</h1>} />
        <Route path="/administracao" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
