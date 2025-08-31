import { useState } from "react";
import AthleteOnboarding from "@/components/AthleteOnboarding";
import AthleteDashboard from "@/components/AthleteDashboard";
import ResultsPage from "@/components/ResultsPage";

const AthleteFlow = () => {
  const [currentStep, setCurrentStep] = useState("onboarding"); // onboarding, dashboard, results

  const renderStep = () => {
    switch (currentStep) {
      case "onboarding":
        return <AthleteOnboarding />;
      case "dashboard":
        return <AthleteDashboard />;
      case "results":
        return <ResultsPage />;
      default:
        return <AthleteOnboarding />;
    }
  };

  return renderStep();
};

export default AthleteFlow;