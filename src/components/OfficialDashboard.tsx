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
  Eye,
  UserCheck,
  Video,
  MapPin,
  LogOut
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AthleteDetailsModal from "./AthleteDetailsModal";
import InvitationModal from "./InvitationModal";
import { useNavigate } from "react-router-dom";

interface OfficialDashboardProps {
  onLogout: () => void;
  officialInfo: { username: string; id: string };
}

const OfficialDashboard = ({ onLogout, officialInfo }: OfficialDashboardProps) => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [showAthleteDetails, setShowAthleteDetails] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const athletesPerPage = 10;

  // Enhanced athlete dataset with more realistic data
  const allAthletes = [
    // Page 1 - Top performers (including required names)
    { id: 1, name: "Srinjoy Mukherjee", athleteId: "ATH7829", age: 17, gender: "Male", district: "Kolkata", overallScore: 94, status: "verified", lastTest: "2024-01-15", rank: 1 },
    { id: 2, name: "Arin Das", athleteId: "ATH4563", age: 16, gender: "Male", district: "Mumbai", overallScore: 92, status: "verified", lastTest: "2024-01-14", rank: 2 },
    { id: 3, name: "Biprarshi Biswas", athleteId: "ATH9142", age: 18, gender: "Male", district: "Delhi", overallScore: 90, status: "borderline", lastTest: "2024-01-13", rank: 3 },
    { id: 4, name: "Supriti Gandhi", athleteId: "ATH6758", age: 17, gender: "Female", district: "Ahmedabad", overallScore: 89, status: "verified", lastTest: "2024-01-12", rank: 4 },
    { id: 5, name: "Subham Neogi", athleteId: "ATH3891", age: 16, gender: "Male", district: "Chennai", overallScore: 87, status: "flagged", lastTest: "2024-01-11", rank: 5 },
    { id: 6, name: "Souvik Chakrabarty", athleteId: "ATH5274", age: 18, gender: "Male", district: "Bangalore", overallScore: 86, status: "verified", lastTest: "2024-01-10", rank: 6 },
    { id: 7, name: "Ananya Sharma", athleteId: "ATH8465", age: 17, gender: "Female", district: "Pune", overallScore: 85, status: "borderline", lastTest: "2024-01-09", rank: 7 },
    { id: 8, name: "Rahul Gupta", athleteId: "ATH2937", age: 16, gender: "Male", district: "Hyderabad", overallScore: 84, status: "verified", lastTest: "2024-01-08", rank: 8 },
    { id: 9, name: "Priya Patel", athleteId: "ATH7183", age: 18, gender: "Female", district: "Surat", overallScore: 83, status: "borderline", lastTest: "2024-01-07", rank: 9 },
    { id: 10, name: "Vikram Singh", athleteId: "ATH4526", age: 17, gender: "Male", district: "Jaipur", overallScore: 82, status: "verified", lastTest: "2024-01-06", rank: 10 },
    
    // Page 2 - Additional athletes
    { id: 11, name: "Kavya Reddy", athleteId: "ATH8712", age: 16, gender: "Female", district: "Visakhapatnam", overallScore: 81, status: "verified", lastTest: "2024-01-05", rank: 11 },
    { id: 12, name: "Arjun Kumar", athleteId: "ATH3654", age: 18, gender: "Male", district: "Lucknow", overallScore: 80, status: "borderline", lastTest: "2024-01-04", rank: 12 },
    { id: 13, name: "Sneha Desai", athleteId: "ATH9283", age: 17, gender: "Female", district: "Nagpur", overallScore: 79, status: "flagged", lastTest: "2024-01-03", rank: 13 },
    { id: 14, name: "Rohit Verma", athleteId: "ATH5741", age: 16, gender: "Male", district: "Indore", overallScore: 78, status: "verified", lastTest: "2024-01-02", rank: 14 },
    { id: 15, name: "Meera Shah", athleteId: "ATH6198", age: 18, gender: "Female", district: "Vadodara", overallScore: 77, status: "borderline", lastTest: "2024-01-01", rank: 15 },
    { id: 16, name: "Karan Joshi", athleteId: "ATH4867", age: 17, gender: "Male", district: "Bhopal", overallScore: 76, status: "verified", lastTest: "2023-12-31", rank: 16 },
    { id: 17, name: "Riya Agarwal", athleteId: "ATH7432", age: 16, gender: "Female", district: "Chandigarh", overallScore: 75, status: "flagged", lastTest: "2023-12-30", rank: 17 },
    { id: 18, name: "Aditya Mishra", athleteId: "ATH3158", age: 18, gender: "Male", district: "Gwalior", overallScore: 74, status: "borderline", lastTest: "2023-12-29", rank: 18 },
    { id: 19, name: "Pooja Nair", athleteId: "ATH8926", age: 17, gender: "Female", district: "Kochi", overallScore: 73, status: "verified", lastTest: "2023-12-28", rank: 19 },
    { id: 20, name: "Siddharth Roy", athleteId: "ATH5673", age: 16, gender: "Male", district: "Guwahati", overallScore: 72, status: "flagged", lastTest: "2023-12-27", rank: 20 }
  ];

  // Filter and search logic
  const filteredAthletes = allAthletes.filter(athlete => {
    const matchesFilter = selectedFilter === "all" || athlete.status === selectedFilter;
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.athleteId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAthletes.length / athletesPerPage);
  const startIndex = (currentPage - 1) * athletesPerPage;
  const endIndex = startIndex + athletesPerPage;
  const currentAthletes = filteredAthletes.slice(startIndex, endIndex);

  const stats = {
    totalAthletes: 5234, // Display inflated number for scale
    verifiedResults: 4521, // Inflated numbers for demo
    flaggedResults: 387,
    borderlineResults: 326
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "default";
      case "borderline": return "secondary";
      case "flagged": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusBadgeClassName = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-600 text-white hover:bg-green-700";
      case "borderline": return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "flagged": return "bg-destructive text-destructive-foreground";
      default: return "";
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

  const handleViewDetails = (athlete: any) => {
    setSelectedAthlete(athlete);
    setShowAthleteDetails(true);
  };

  const handleSendInvitation = (athlete: any) => {
    setSelectedAthlete(athlete);
    setShowInvitation(true);
  };

  const handleVideoView = (athlete: any) => {
    navigate("/video-player");
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
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
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Welcome, {officialInfo.username}</span>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
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
                onClick={() => handleFilterChange("all")}
              >
                All Athletes ({stats.totalAthletes})
              </Button>
              <Button
                variant={selectedFilter === "flagged" ? "destructive" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("flagged")}
                className={selectedFilter === "flagged" ? "bg-destructive text-destructive-foreground" : ""}
              >
                <AlertTriangle className="h-3 w-3 mr-1" />
                Flagged ({stats.flaggedResults})
              </Button>
              <Button
                variant={selectedFilter === "borderline" ? "secondary" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("borderline")}
                className={selectedFilter === "borderline" ? "bg-yellow-500 text-white hover:bg-yellow-600" : ""}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                Borderline ({stats.borderlineResults})
              </Button>
              <Button
                variant={selectedFilter === "verified" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("verified")}
                className={selectedFilter === "verified" ? "bg-green-600 text-white hover:bg-green-700" : ""}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified ({stats.verifiedResults})
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
            {currentAthletes.map((athlete) => {
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
                        <span className="text-xs text-muted-foreground">({athlete.athleteId})</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{athlete.gender}, Age {athlete.age}</span>
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
                        athlete.status === 'verified' ? 'text-primary' :
                        athlete.status === 'borderline' ? 'text-orange-500' :
                        'text-destructive'
                      }`} />
                      <Badge variant={getStatusColor(athlete.status) as any} className={`capitalize ${getStatusBadgeClassName(athlete.status)}`}>
                        {athlete.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleViewDetails(athlete)}
                        title="View detailed test results"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleSendInvitation(athlete)}
                        title="Send camp invitation"
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleVideoView(athlete)}
                        title="View raw footage"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <span className="px-3 py-2">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(78)}
                      isActive={currentPage === 78}
                      className="cursor-pointer"
                    >
                      78
                    </PaginationLink>
                  </PaginationItem>
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>

        {/* Modals */}
        <AthleteDetailsModal
          athlete={selectedAthlete}
          isOpen={showAthleteDetails}
          onClose={() => setShowAthleteDetails(false)}
        />
        
        <InvitationModal
          athlete={selectedAthlete}
          isOpen={showInvitation}
          onClose={() => setShowInvitation(false)}
        />

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