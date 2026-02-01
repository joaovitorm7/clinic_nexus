import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import VisualizarAgenda from "./pages/recepcao/VisualizarAgenda/VisualizarAgenda";

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
import VisualizarConsultasPeriodo from "./pages/recepcao/VisualizarConsultasPeriodo/VisualizarConsultasPeriodo";

// Ala Médica
import DashboardAlaMedica from "./pages/AlaMedica/Dashboard/DashboardAlaMedica";
import Prontuario from "./pages/AlaMedica/prontuario/Prontuario";
import ListarConsultas from "./pages/AlaMedica/ListarConsultas/ListarConsultas";

// Outros
import EmployeePage from "./EmployeePage";
import DetalhesConsulta from "./pages/AlaMedica/DetalhesConsulta/DetalhesConsulta";

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
      <Route path="/medico/consultas" element={<ListarConsultas />} />
      <Route path="/medico/consulta/:id" element={<DetalhesConsulta />} />

      {/* Recepção */}
      <Route path="/recepcao" element={<Recepcao />} />
      <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
      <Route path="/recepcao/editaragenda" element={<EditarAgenda />} />
      <Route path="/consultas" element={<Consultas />} />
      <Route path="/recepcao/cadastrar-paciente" element={<CadastrarPaciente />} />
      <Route path="/recepcao/pacientes" element={<VisualizarPacientes />} />
      <Route path="/recepcao/editar-paciente" element={<EditarPaciente />} />
      <Route path="/recepcao/visualizar-consultas-periodo" element={<VisualizarConsultasPeriodo />} />

      {/* Teste */}
      <Route path="/test" element={<EmployeePage />} />

<Route
  path="/recepcao/VisualizarAgenda"
  element={<VisualizarAgenda />}
/>
    </Routes>
  );
}

export default App;
