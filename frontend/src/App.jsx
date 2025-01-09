import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import UserProfile from "./pages/profile/UserProfile";
import UpdateProfile from "./pages/profile/UpdateProfile"; 
import SettingsPage from "./pages/SettingsPage/SettingsPage"; 
import { useEffect } from "react";
import { useThemeStore } from "../src/pages/store/useThemeStore"; // Import theme store
import ForgetPassword from "./ForgetPassword"; // Import the Forget Password page

import Game from "./pages/game/Game"; // Import the Game page
import DXBallGame from "./pages/game/DXBallGame"; // Import the DXBallGame page
import RacingGame from "./pages/game/RacingGame"; // Import the RacingGame page
import ChessGame from "./pages/game/ChessGame"; // Import the ChessGame page
import { Chessboard } from 'react-chessboard';
import LandingPage from "./pages/home/LandingPage";
function App() {
  const { authUser } = useAuthContext();
  const { theme } = useThemeStore(); // Access the theme from the store

  // Apply the selected theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); //  the theme on the root element
  }, [theme]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
      <Route path="/" element={<LandingPage />} /> {/* New Landing page as default route */}
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/game" element={<Game />} />
        <Route path="/chess" element={<ChessGame />} />
        <Route path="/dxball" element={<DXBallGame />} />
        <Route path="/racing" element={<RacingGame />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
