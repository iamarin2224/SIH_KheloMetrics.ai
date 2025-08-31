import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AthleteOnboarding from "@/components/AthleteOnboarding";
import AthleteDashboard from "@/components/AthleteDashboard";
import ResultsPage from "@/components/ResultsPage";

const AthleteFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("onboarding");

  useEffect(() => {
    // Set step based on current route
    if (location.pathname === "/athlete") {
      setCurrentStep("onboarding");
    } else if (location.pathname === "/athlete-dashboard") {
      setCurrentStep("dashboard");
    } else if (location.pathname === "/athlete-results") {
      setCurrentStep("results");
    }
  }, [location.pathname]);

  const renderStep = () => {
    switch (currentStep) {
      case "onboarding":
        return <AthleteOnboarding onComplete={() => navigate("/athlete-dashboard")} />;
      case "dashboard":
        return <AthleteDashboard onViewResults={() => navigate("/athlete-results")} />;
      case "results":
        return <ResultsPage onBackToDashboard={() => navigate("/athlete-dashboard")} />;
      default:
        return <AthleteOnboarding onComplete={() => navigate("/athlete-dashboard")} />;
    }
  };

  return renderStep();
};

export default AthleteFlow;