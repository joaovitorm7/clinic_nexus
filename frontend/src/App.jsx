import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard/DashboardAdmin";
import Funcionarios from "./pages/Admin/Funcionarios/DashboardFunc";
import AddFunc from './pages/Admin/Funcionarios/addFunc';
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<h1 style={{ padding: '60px', textAlign: "center" }}>Página Inicial</h1>} />
        <Route path="/administracao" element={<Dashboard />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/admin/funcionarios/AddFunc" element={<AddFunc />} />
      </Route>
    </Routes>
  );
}

export default App;