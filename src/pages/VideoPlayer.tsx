import { useState } from "react";
import { ArrowLeft, Play, Pause, Volume2, Maximize, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration] = useState("15:42");

  // Mock athlete data for the video
  const athlete = {
    name: "Srinjoy Mukherjee",
    id: "ATH001",
    testSession: "Morning Session - January 15, 2024",
    exercises: [
      { name: "30m Dash", timestamp: "0:45", completed: true },
      { name: "Shuttle Run", timestamp: "3:20", completed: true },
      { name: "Standing Broad Jump", timestamp: "6:15", completed: true },
      { name: "Vertical Jump", timestamp: "8:30", completed: true },
      { name: "Yo-Yo Test", timestamp: "10:45", completed: false },
      { name: "1000m Run", timestamp: "12:20", completed: false },
    ]
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/official")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">Video Analysis</h1>
                <p className="text-sm text-muted-foreground">Raw footage and exercise mapping</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="card-elevated overflow-hidden">
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </div>
                    <p className="text-lg font-medium">Demo Video Player</p>
                    <p className="text-sm text-white/80">Raw footage: {athlete.testSession}</p>
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{currentTime} / {duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div className="bg-primary h-1 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Video Info */}
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">Assessment Session Recording</h2>
                  <p className="text-muted-foreground mb-4">{athlete.testSession}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {athlete.name}
                    </span>
                    <span>ID: {athlete.id}</span>
                    <span>Duration: {duration}</span>
                  </div>
                </div>
                <Badge variant="secondary">Raw Footage</Badge>
              </div>
            </Card>
          </div>

          {/* Exercise Timeline */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Exercise Timeline</h3>
              <div className="space-y-3">
                {athlete.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      exercise.completed
                        ? 'bg-success/10 border-success/20 hover:bg-success/20'
                        : 'bg-muted/30 border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setCurrentTime(exercise.timestamp)}
                  >
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground">{exercise.timestamp}</p>
                    </div>
                    <Badge variant={exercise.completed ? "default" : "secondary"}>
                      {exercise.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Generate Highlights
                </Button>
                <Button variant="outline" className="w-full">
                  Export Clips
                </Button>
                <Button variant="outline" className="w-full">
                  Add Annotations
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;