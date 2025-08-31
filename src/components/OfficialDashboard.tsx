import { useState } from "react";
import { 
  Users, 
  TrendingUp, 
  Filter, 
  Search, 
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Download,
  MoreHorizontal,
  Eye,
  UserCheck,
  MapPin
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OfficialDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const athletes = [
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 17,
      district: "Mumbai",
      overallScore: 89,
      status: "verified",
      lastTest: "2024-01-15",
      rank: 1,
      flagged: false
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 16,
      district: "Delhi",
      overallScore: 87,
      status: "verified",
      lastTest: "2024-01-14",
      rank: 2,
      flagged: false
    },
    {
      id: 3,
      name: "Amit Singh",
      age: 18,
      district: "Kolkata",
      overallScore: 85,
      status: "borderline",
      lastTest: "2024-01-13",
      rank: 3,
      flagged: true
    },
    {
      id: 4,
      name: "Sneha Patel",
      age: 17,
      district: "Ahmedabad",
      overallScore: 83,
      status: "verified",
      lastTest: "2024-01-12",
      rank: 4,
      flagged: false
    },
    {
      id: 5,
      name: "Rohit Verma",
      age: 16,
      district: "Chennai",
      overallScore: 75,
      status: "flagged",
      lastTest: "2024-01-11",
      rank: 5,
      flagged: true
    }
  ];

  const stats = {
    totalAthletes: 10247,
    verifiedResults: 9876,
    flaggedResults: 89,
    borderlineResults: 282
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "success";
      case "borderline": return "warning";
      case "flagged": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle2;
      case "borderline": return AlertCircle;
      case "flagged": return AlertTriangle;
      default: return CheckCircle2;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Official Dashboard</h1>
              <p className="text-sm text-muted-foreground">Sports Authority of India - Talent Assessment</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Athletes</p>
                <p className="text-2xl font-bold">{stats.totalAthletes.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Results</p>
                <p className="text-2xl font-bold text-success">{stats.verifiedResults.toLocaleString()}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </Card>
          
          <Card className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Borderline</p>
                <p className="text-2xl font-bold text-warning">{stats.borderlineResults}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </Card>
          
          <Card className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-bold text-destructive">{stats.flaggedResults}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="card-elevated">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                All Athletes
              </Button>
              <Button
                variant={selectedFilter === "flagged" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("flagged")}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Flagged
              </Button>
              <Button
                variant={selectedFilter === "borderline" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("borderline")}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Borderline
              </Button>
              <Button
                variant={selectedFilter === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("verified")}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Button>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search athletes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Athletes Leaderboard */}
        <Card className="card-elevated">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Athlete Leaderboard</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Ranked by overall score</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {athletes.map((athlete, index) => {
              const StatusIcon = getStatusIcon(athlete.status);
              
              return (
                <div
                  key={athlete.id}
                  className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {athlete.rank}
                      </div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{athlete.name}</h4>
                        {athlete.flagged && (
                          <Badge variant="destructive" className="text-xs">Flagged</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Age {athlete.age}</span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {athlete.district}
                        </span>
                        <span>Last test: {athlete.lastTest}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold">{athlete.overallScore}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-5 w-5 ${
                        athlete.status === 'verified' ? 'text-success' :
                        athlete.status === 'borderline' ? 'text-warning' :
                        'text-destructive'
                      }`} />
                      <Badge variant={getStatusColor(athlete.status) as any} className="capitalize">
                        {athlete.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="card-elevated bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-3">Flagged Results Review</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {stats.flaggedResults} results require manual review for verification.
            </p>
            <Button className="btn-primary">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Review Flagged Results
            </Button>
          </Card>
          
          <Card className="card-elevated">
            <h3 className="text-lg font-semibold mb-3">District Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View comprehensive analytics by district and region.
            </p>
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboard;