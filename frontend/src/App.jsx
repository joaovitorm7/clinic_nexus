import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import Funcionarios from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/addFunc';
import AgendarConsulta from './pages/recepcao/AgendarConsulta/AgendarConsulta';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1 style={{padding: '60px', textAlign: "center" }}> Página Inicial</h1>} />
        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />   
        <Route path="/admin/funcionarios/AddFunc" element={<AddFunc />} />
        <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
      </Routes>
    </>
  );
}

export default App;
