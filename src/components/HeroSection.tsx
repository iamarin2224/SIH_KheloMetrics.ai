import { ArrowRight, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-sports.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Athletes in training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Ministry of Youth Affairs & Sports</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Potential
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-white/90 max-w-3xl mx-auto">
            Democratize Sports Talent Assessment
          </p>

          <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
            Advanced AI-powered assessments to identify and nurture sporting talent across India. 
            Fair, accessible, and scientifically validated testing for every athlete.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-hero w-full sm:w-auto text-lg group"
              onClick={() => window.location.href = "/athlete"}
            >
              <Users className="mr-2 h-5 w-5" />
              Athlete Login / Register
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50"
              onClick={() => window.location.href = "/official"}
            >
              Official Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">Athletes Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;