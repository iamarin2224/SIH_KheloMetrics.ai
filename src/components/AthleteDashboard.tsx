import { useState } from "react";
import { 
  TrendingUp, 
  Clock, 
  Trophy, 
  Activity, 
  Target, 
  Timer,
  ArrowRight,
  CheckCircle2,
  Play
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const AthleteDashboard = () => {
  const [completedTests, setCompletedTests] = useState(2);
  const totalTests = 4;
  const progressPercentage = (completedTests / totalTests) * 100;

  const tests = [
    {
      id: 1,
      name: "Vertical Jump",
      description: "Measure explosive power and leg strength",
      icon: TrendingUp,
      duration: "5 minutes",
      completed: true,
      score: "85cm",
      badge: "Excellent"
    },
    {
      id: 2,
      name: "Sit-ups Test",
      description: "Core strength and endurance assessment",
      icon: Activity,
      duration: "3 minutes",
      completed: true,
      score: "45 reps",
      badge: "Good"
    },
    {
      id: 3,
      name: "Shuttle Run",
      description: "Agility and change of direction speed",
      icon: Target,
      duration: "4 minutes",
      completed: false,
      score: null,
      badge: null
    },
    {
      id: 4,
      name: "Endurance Run",
      description: "Cardiovascular fitness assessment",
      icon: Timer,
      duration: "15 minutes",
      completed: false,
      score: null,
      badge: null
    }
  ];

  const handleStartTest = (testId: number) => {
    // In a real app, this would navigate to the test interface
    console.log(`Starting test ${testId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Athlete Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Rajesh Kumar</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">RK</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <Card className="card-elevated">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Assessment Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedTests} of {totalTests} tests completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-3 mb-4" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Keep going! You're doing great.</span>
            <span className="text-primary font-medium">
              {totalTests - completedTests} tests remaining
            </span>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated text-center">
            <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-lg font-semibold">2</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </Card>
          
          <Card className="card-elevated text-center">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-lg font-semibold">89</div>
            <div className="text-xs text-muted-foreground">Overall Score</div>
          </Card>
          
          <Card className="card-elevated text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-lg font-semibold">15m</div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </Card>
          
          <Card className="card-elevated text-center">
            <Activity className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-lg font-semibold">Top 10%</div>
            <div className="text-xs text-muted-foreground">Ranking</div>
          </Card>
        </div>

        {/* Test Cards */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Fitness Tests</h3>
          <div className="grid gap-4">
            {tests.map((test) => {
              const IconComponent = test.icon;
              
              return (
                <Card key={test.id} className="card-test">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        test.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {test.completed ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <IconComponent className="h-6 w-6" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{test.name}</h4>
                          {test.completed && test.badge && (
                            <span className={`badge-${test.badge.toLowerCase() === 'excellent' ? 'success' : 'warning'}`}>
                              {test.badge}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {test.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {test.duration}
                          </span>
                          {test.completed && test.score && (
                            <span className="font-medium text-primary">
                              Score: {test.score}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {test.completed ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartTest(test.id)}
                          className="text-xs"
                        >
                          View Results
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleStartTest(test.id)}
                          className="btn-primary group"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Start Test
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        {completedTests < totalTests && (
          <Card className="card-elevated bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready for your next test?</h3>
              <p className="text-muted-foreground mb-4">
                Complete your assessment to get personalized training recommendations.
              </p>
              <Button className="btn-primary">
                Continue Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AthleteDashboard;