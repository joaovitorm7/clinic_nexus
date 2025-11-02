import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import Funcionarios from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/addFunc';
import AgendarConsulta from './pages/recepcao/AgendarConsulta/AgendarConsulta';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./pages/Register/Register";

function App() {

  //teste para deslogar pelo console
  const { logout } = useAuth();
  window.logout = logout; 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<h1 style={{ padding: '60px', textAlign: "center" }}>Página Inicial</h1>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['administrador']}/>}>
        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />   
        <Route path="/admin/funcionarios/addFunc" element={<AddFunc />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['recepcao']}/>}>
        <Route path="/recepcao/agendar" element={<AgendarConsulta />} />
      </Route>
    </Routes>
  );
}

export default App;
