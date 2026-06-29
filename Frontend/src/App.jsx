import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

     <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /> </ProtectedRoute>  }/>
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route  path="/verify-email/:token" element={<VerifyEmail />}/>
       <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;