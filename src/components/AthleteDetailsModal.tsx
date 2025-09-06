import { useState } from "react";
import { X, Trophy, Target, TrendingUp, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TestResult {
  name: string;
  result: string;
  benchmark: string;
  percentile: number;
  status: "above" | "below" | "at";
  unit: string;
}

interface AthleteDetailsModalProps {
  athlete: any;
  isOpen: boolean;
  onClose: () => void;
}

const AthleteDetailsModal = ({ athlete, isOpen, onClose }: AthleteDetailsModalProps) => {
  if (!athlete) return null;

  const testResults: TestResult[] = [
    {
      name: "30-Meter Dash",
      result: athlete.gender === "Male" ? "4.2" : "4.6",
      benchmark: athlete.gender === "Male" ? "4.0-4.5" : "4.5-5.0",
      percentile: 78,
      status: "above",
      unit: "seconds"
    },
    {
      name: "Shuttle Run 5x10m",
      result: "11.8",
      benchmark: "Under 12s",
      percentile: 82,
      status: "above",
      unit: "seconds"
    },
    {
      name: "Standing Broad Jump",
      result: athlete.gender === "Male" ? "2.6" : "2.1",
      benchmark: athlete.gender === "Male" ? "2.5m" : "2.0m",
      percentile: 85,
      status: "above",
      unit: "meters"
    },
    {
      name: "Vertical Jump",
      result: athlete.gender === "Male" ? "62" : "52",
      benchmark: athlete.gender === "Male" ? "60cm" : "50cm",
      percentile: 72,
      status: "above",
      unit: "cm"
    },
    {
      name: "Yo-Yo Test",
      result: "20.5",
      benchmark: "Score >19",
      percentile: 88,
      status: "above",
      unit: "score"
    },
    {
      name: "1000m Run/Walk",
      result: athlete.gender === "Male" ? "2:58" : "3:25",
      benchmark: athlete.gender === "Male" ? "Under 3:00" : "Under 3:30",
      percentile: 76,
      status: "above",
      unit: "minutes"
    },
    {
      name: "Sit & Reach",
      result: "22",
      benchmark: "20+ cm",
      percentile: 70,
      status: "above",
      unit: "cm"
    },
    {
      name: "Partial Curl-ups",
      result: "45",
      benchmark: "40-50/min",
      percentile: 80,
      status: "above",
      unit: "/min"
    }
  ];

  const overallPercentile = Math.round(testResults.reduce((sum, test) => sum + test.percentile, 0) / testResults.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{athlete.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{athlete.name}</h2>
                <p className="text-muted-foreground">ID: {athlete.athleteId}</p>
              </div>
            </div>
            <Badge variant={athlete.status === "verified" ? "default" : athlete.status === "borderline" ? "secondary" : "destructive"}>
              {athlete.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Athlete Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Trophy className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <p className="text-2xl font-bold">{athlete.overallScore}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Percentile</p>
                  <p className="text-2xl font-bold">{overallPercentile}th</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Test</p>
                  <p className="text-lg font-semibold">{athlete.lastTest}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Personal Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{athlete.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{athlete.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">District</p>
                <p className="font-medium">{athlete.district}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="font-medium">#{athlete.rank}</p>
              </div>
            </div>
          </Card>

          {/* Test Results */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Detailed Test Results
            </h3>
            <div className="space-y-4">
              {testResults.map((test, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{test.name}</h4>
                    <Badge variant={test.status === "above" ? "default" : "secondary"}>
                      {test.status === "above" ? "Above Benchmark" : "Below Benchmark"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Result</p>
                      <p className="text-lg font-semibold">{test.result} {test.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Benchmark</p>
                      <p className="font-medium">{test.benchmark}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Percentile</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={test.percentile} className="flex-1" />
                        <span className="text-sm font-medium">{test.percentile}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="btn-primary">
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AthleteDetailsModal;