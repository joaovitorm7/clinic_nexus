import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import VisualizarAgenda from "./pages/recepcao/VisualizarAgenda/VisualizarAgenda";
import Navbar from "./components/Navbar/Navbar";

function Layout() {
  return (
    <> 
      <Navbar />
      <Outlet />
    </>
  );
}

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
import ListarConsultas from "./pages/AlaMedica/ListarConsultas/ListarConsultas";
import EditarConsulta from "./pages/AlaMedica/EditarConsulta/EditarConsulta";
import DetalhesConsulta from "./pages/AlaMedica/DetalhesConsulta/DetalhesConsulta";

// Lista de Pacientes
import ListaPacientes from "./pages/AlaMedica/ListaPacientes/ListaPacientes";

// Lista de Prontuários
import ListaProntuarios from "./pages/AlaMedica/ListaProntuarios/ListaProntuarios";

// Todos os Prontuários
import TodosProntuarios from "./pages/AlaMedica/TodosProntuarios/TodosProntuarios";

// Prontuário do Paciente
import ProntuarioPaciente from "./pages/AlaMedica/ProntuarioPaciente/ProntuarioPaciente";

// Outros
import EmployeePage from "./EmployeePage";

function App() {
  const { logout } = useAuth();
  window.logout = logout;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}> 
        {/* Administração */} 
        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<DashboardFunc />} />
        <Route path="/admin/funcionarios/addFunc" element={<AddFunc />} />
        <Route path="/admin/medicos" element={<DashboardMed />} />
        <Route path="/admin/editar-funcionarios" element={<EditarFuncionarios />} />

        {/* Ala Médica */} 
        <Route path="/alamedica" element={<DashboardAlaMedica />} />
        <Route path="/medico/agenda" element={<CalendarPage />} />
        <Route path="/alamedica/prontuario" element={<Prontuario />} />
        <Route path="/medico/prontuarios" element={<TodosProntuarios />} />
        <Route path="/medico/consultas" element={<ListarConsultas />} />
        <Route path="/medico/consulta/:id" element={<DetalhesConsulta />} />
        <Route path="/medico/editar-consulta/:id" element={<EditarConsulta />} />

        {/* Recepção */} 
        <Route path="/recepcao" element={<Recepcao />} />
        <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
        <Route path="/recepcao/editaragenda" element={<EditarAgenda />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/recepcao/cadastrar-paciente" element={<CadastrarPaciente />} />
        <Route path="/recepcao/pacientes" element={<VisualizarPacientes />} />
        <Route path="/medico/pacientes" element={<ListaPacientes />} />
        <Route path="/medico/pacientes/:id" element={<ProntuarioPaciente />} />
        <Route path="/recepcao/editar-paciente" element={<EditarPaciente />} />
        <Route path="/recepcao/VisualizarAgenda" element={<VisualizarAgenda />} />

        {/* Teste */} 
        <Route path="/test" element={<EmployeePage />} />
      </Route>
    </Routes>
  );
}

export default App;