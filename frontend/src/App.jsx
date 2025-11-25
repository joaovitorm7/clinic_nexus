import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import Funcionarios from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/AddFunc';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./pages/Register/Register";
import DashboardMed from "./pages/Admin/Medicos/DashboardMed";
import Recepcao from "./pages/recepcao/DashboardRecepcao/DashboardRecepcao"
import CadastrarPaciente from './pages/recepcao/CadastroPaciente/CadastrarPaciente';
import VisualizarPacientes from './pages/recepcao/VisualizarPacientes/VisualizarPacientes'; 
import AgendarConsulta from './pages/recepcao/AgendarConsulta/AgendarConsulta';
import Consultas from "./pages/recepcao/Visualizar/Consulta";
import DashboardFunc from "./pages/Admin/Funcionarios/DashboardFunc";
import EmployeePage from "./EmployeePage";
import DashboardAlaMedica from './pages/AlaMedica/Dashboard/DashboardAlaMedica';
import Prontuario from './pages/AlaMedica/prontuario/Prontuario';

function App() {

  //teste para deslogar pelo console
  const { logout } = useAuth();
  window.logout = logout; 

  //todo: css para calendario

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />



        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<DashboardFunc />} />   
        <Route path="/admin/funcionarios/addFunc" element={<AddFunc />} />
        <Route path="/admin/medicos" element={<DashboardMed />} />
        <Route path ="/test" element ={<EmployeePage/>} />

        <Route path="/alamedica" element={<DashboardAlaMedica />} />
        <Route path="/alamedica/prontuario" element={<Prontuario />} />
       

        <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
        <Route path="/recepcao" element={<Recepcao/>} />
        <Route path="/consultas" element={<Consultas/>} />
        <Route path="/recepcao/pacientes/novo" element={<CadastrarPaciente />} />
        <Route path="/recepcao/pacientes" element={<VisualizarPacientes />} />
        <Route path="/recepcao/pacientes/:id/editar" element={<CadastrarPaciente />} /> {/* reutilizando o formulário para edição */}
        

    </Routes>
  );
}

export default App;