import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import Funcionarios from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/AddFunc';
import AgendarConsulta from './pages/recepcao/AgendarConsulta/AgendarConsulta';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./pages/Register/Register";
import DashboardMed from "./pages/Admin/Medicos/DashboardMed";
import Recepcao from "./pages/recepcao/DashboardRecepcao/DashboardRecepcao"
import Consultas from "./pages/recepcao/Visualizar/Consulta";
import DashboardFunc from "./pages/Admin/Funcionarios/DashboardFunc";
import EmployeePage from "./EmployeePage";
function App() {

  //teste para deslogar pelo console
  const { logout } = useAuth();
  window.logout = logout; 

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />



        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<DashboardFunc />} />   
        <Route path="/admin/funcionarios/addFunc" element={<AddFunc />} />
        <Route path="/admin/medicos" element={<DashboardMed />} />
        <Route path ="/test" element ={<EmployeePage/>} />

        <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
        <Route path="/recepcao" element={<Recepcao/>} />
        <Route path="/consultas" element={<Consultas/>} />
    </Routes>
  );
}

export default App;