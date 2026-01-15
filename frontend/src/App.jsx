import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Admin
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import DashboardFunc from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/AddFunc';
import DashboardMed from "./pages/Admin/Medicos/DashboardMed";
import EditarFuncionarios from "./pages/Admin/EditarFuncionarios/EditarFuncionarios";

// Auth
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Recepção
import Recepcao from "./pages/recepcao/DashboardRecepcao/DashboardRecepcao";
import AgendarConsulta from './pages/recepcao/AgendarConsulta/AgendarConsulta';
import Consultas from "./pages/recepcao/Visualizar/Consulta";
import EditarAgenda from "./pages/recepcao/EditarAgenda/EditarAgenda";
import CadastrarPaciente from "./pages/recepcao/CadastroPaciente/CadastrarPaciente";
import VisualizarPacientes from "./pages/recepcao/VisualizarPacientes/VisualizarPacientes";
import EditarPaciente from "./pages/recepcao/EditarPaciente/EditarPaciente";
import CalendarPage from "./pages/recepcao/AgendaMedico/AgendaMedico";

// Ala Médica
import DashboardAlaMedica from "./pages/AlaMedica/Dashboard/DashboardAlaMedica";
import Prontuario from "./pages/AlaMedica/prontuario/Prontuario";

// Outros
import EmployeePage from "./EmployeePage";

function App() {
  const { logout } = useAuth();
  window.logout = logout;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Administração */}
      <Route path="/administracao" element={<Dashboard />} />
      <Route path="/funcionarios" element={<DashboardFunc />} />
      <Route path="/admin/funcionarios/addFunc" element={<AddFunc />} />
      <Route path="/admin/medicos" element={<DashboardMed />} />
      <Route path="/admin/editar-funcionarios" element={<EditarFuncionarios />} />

      {/* Ala Médica */}
      <Route path="/alamedica" element={<DashboardAlaMedica />} />
      <Route path="/alamedica/prontuario" element={<Prontuario />} />

      {/* Recepção */}
      <Route path="/recepcao" element={<Recepcao />} />
      <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
      <Route path="/recepcao/editaragenda" element={<EditarAgenda />} />
      <Route path="/consultas" element={<Consultas />} />
      <Route path="/recepcao/cadastrar-paciente" element={<CadastrarPaciente />} />
      <Route path="/recepcao/pacientes" element={<VisualizarPacientes />} />
      <Route path="/recepcao/editar-paciente" element={<EditarPaciente />} />

      {/* Teste */}
      <Route path="/test" element={<EmployeePage />} />

      { /* <Route path="/calendario" element={<CalendarPage />} /> */ }
    </Routes>
  );
}

export default App;
