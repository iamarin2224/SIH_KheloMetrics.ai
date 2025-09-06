import { useState } from "react";
import OfficialDashboard from "@/components/OfficialDashboard";
import OfficialLogin from "@/components/OfficialLogin";

const OfficialFlow = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [officialInfo, setOfficialInfo] = useState({ username: "", id: "" });

  const handleLogin = (credentials: { username: string; id: string }) => {
    setOfficialInfo(credentials);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOfficialInfo({ username: "", id: "" });
  };

  if (!isLoggedIn) {
    return <OfficialLogin onLogin={handleLogin} />;
  }

  return <OfficialDashboard onLogout={handleLogout} officialInfo={officialInfo} />;
};

export default OfficialFlow;