import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Activity, 
  Award,
  Share2,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  Wifi,
  WifiOff
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ResultsPage = () => {
  const testResults: Array<{
    test: string;
    score: string;
    percentile: number;
    benchmark: string;
    icon: React.ComponentType<any>;
    color: string;
  }> = [
    {
      test: "Vertical Jump",
      score: "85cm",
      percentile: 92,
      benchmark: "Excellent",
      icon: TrendingUp,
      color: "success"
    },
    {
      test: "Sit-ups",
      score: "45 reps",
      percentile: 78,
      benchmark: "Good",
      icon: Activity,
      color: "warning"
    },
    {
      test: "Shuttle Run",
      score: "9.2s",
      percentile: 89,
      benchmark: "Excellent",
      icon: Target,
      color: "success"
    },
    {
      test: "Endurance Run",
      score: "8:45 min",
      percentile: 85,
      benchmark: "Very Good",
      icon: Clock,
      color: "success"
    }
  ];

  const overallScore = 86;
  const [syncStatus, setSyncStatus] = useState<"pending" | "syncing" | "completed">("completed");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Assessment Results</h1>
              <p className="text-sm text-muted-foreground">Your complete performance report</p>
            </div>
            <div className="flex items-center space-x-2">
              {syncStatus === "completed" && (
                <div className="flex items-center text-success text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <Wifi className="h-4 w-4" />
                </div>
              )}
              {syncStatus === "pending" && (
                <div className="flex items-center text-warning text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <WifiOff className="h-4 w-4" />
                </div>
              )}
              {syncStatus === "syncing" && (
                <div className="flex items-center text-primary text-sm">
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  <Wifi className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Overall Score */}
        <Card className="card-elevated text-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{overallScore}/100</h2>
            <p className="text-lg text-muted-foreground">Overall Fitness Score</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">Top 15%</div>
              <div className="text-sm text-muted-foreground">National Ranking</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">A+</div>
              <div className="text-sm text-muted-foreground">Grade</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">4</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </Card>

        {/* Badges Earned */}
        <Card className="card-elevated">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-warning" />
            Badges Earned
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-sm font-medium">Power Athlete</div>
              <div className="text-xs text-muted-foreground">Vertical Jump</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <div className="text-sm font-medium">Core Strong</div>
              <div className="text-xs text-muted-foreground">Sit-ups</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div className="text-sm font-medium">Agility Master</div>
              <div className="text-xs text-muted-foreground">Shuttle Run</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-sm font-medium">Endurance Pro</div>
              <div className="text-xs text-muted-foreground">Endurance Run</div>
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Test Results</h3>
          <div className="grid gap-4">
            {testResults.map((result, index) => {
              const IconComponent = result.icon;
              
              return (
                <Card key={index} className="card-elevated">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        result.color === 'success' 
                          ? 'bg-success text-success-foreground'
                          : result.color === 'warning'
                          ? 'bg-warning text-warning-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">{result.test}</h4>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>Score: <span className="font-medium text-foreground">{result.score}</span></span>
                          <span>•</span>
                          <span>{result.percentile}th percentile</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`badge-${result.color}`}>
                        {result.benchmark}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sync Status */}
        <Card className="card-elevated">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                syncStatus === "completed" 
                  ? 'bg-success text-success-foreground'
                  : syncStatus === "pending"
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}>
                {syncStatus === "completed" && <CheckCircle2 className="h-5 w-5" />}
                {syncStatus === "pending" && <Clock className="h-5 w-5" />}
                {syncStatus === "syncing" && <RefreshCw className="h-5 w-5 animate-spin" />}
              </div>
              
              <div>
                <h4 className="font-medium">
                  {syncStatus === "completed" && "Results Uploaded"}
                  {syncStatus === "pending" && "Upload Pending"}
                  {syncStatus === "syncing" && "Uploading..."}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {syncStatus === "completed" && "Your results have been successfully uploaded to the server"}
                  {syncStatus === "pending" && "Results will be uploaded when connection is available"}
                  {syncStatus === "syncing" && "Uploading your results to the server"}
                </p>
              </div>
            </div>
            
            {syncStatus === "pending" && (
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Upload
              </Button>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="btn-primary flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        {/* Next Steps */}
        <Card className="card-elevated bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <h3 className="text-lg font-semibold mb-3">What's Next?</h3>
          <div className="space-y-2 text-sm">
            <p>🏃‍♂️ <strong>Strength Training:</strong> Focus on explosive power exercises</p>
            <p>🏋️‍♂️ <strong>Core Conditioning:</strong> Continue building core endurance</p>
            <p>⚡ <strong>Agility Drills:</strong> Maintain your excellent agility performance</p>
            <p>💨 <strong>Cardio Base:</strong> Keep up your endurance training routine</p>
          </div>
          <Button className="mt-4 btn-secondary">
            Get Training Plan
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ResultsPage;