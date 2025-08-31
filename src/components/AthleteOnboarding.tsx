import { useState } from "react";
import { ChevronRight, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AthleteOnboarding = ({ onComplete }: { onComplete?: () => void }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "bn", name: "Bengali", native: "বাংলা" },
  ];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setTimeout(() => setStep(2), 500);
  };

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep(3);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      if (onComplete) {
        onComplete();
      } else {
        window.location.href = "/athlete-dashboard";
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Step 1: Language Selection */}
        {step === 1 && (
          <Card className="card-elevated animate-slide-up">
            <div className="text-center mb-8">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Choose Your Language</h2>
              <p className="text-muted-foreground">अपनी भाषा चुनें / আপনার ভাষা নির্বাচন করুন</p>
            </div>

            <div className="space-y-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="w-full p-4 text-left border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-sm text-muted-foreground">{lang.native}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Phone Number */}
        {step === 2 && (
          <Card className="card-elevated animate-slide-up">
            <div className="text-center mb-8">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Enter Mobile Number</h2>
              <p className="text-muted-foreground">We'll send you a verification code</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number</label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-xl">
                    <span className="text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="Enter 10-digit number"
                    className="flex-1 px-4 py-3 border border-border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={phone.length !== 10}
                className="w-full btn-primary"
              >
                Send OTP
              </Button>

              <button
                onClick={() => setStep(1)}
                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to language selection
              </button>
            </div>
          </Card>
        )}

        {/* Step 3: OTP Verification */}
        {step === 3 && (
          <Card className="card-elevated animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">📱</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="text-muted-foreground">
                Enter the 6-digit code sent to +91 {phone}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-3 text-center text-lg font-mono border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6}
                className="w-full btn-primary"
              >
                Verify & Continue
              </Button>

              <div className="text-center space-y-2">
                <button className="text-sm text-primary hover:underline">
                  Resend OTP
                </button>
                <br />
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Change mobile number
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AthleteOnboarding;