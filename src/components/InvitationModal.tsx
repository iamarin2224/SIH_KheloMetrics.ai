import { useState } from "react";
import { Calendar, Mail, MapPin, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface InvitationModalProps {
  athlete: any;
  isOpen: boolean;
  onClose: () => void;
}

const InvitationModal = ({ athlete, isOpen, onClose }: InvitationModalProps) => {
  const [campDate, setCampDate] = useState("");
  const [venue, setVenue] = useState("SAI Training Center, Delhi");
  const [duration, setDuration] = useState("7 days");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const { toast } = useToast();

  const handleSendInvitation = () => {
    if (!campDate) {
      toast({
        title: "Error",
        description: "Please select a camp date",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending invitation
    toast({
      title: "Invitation Sent",
      description: `Official camp invitation sent to ${athlete?.name}`,
    });
    
    onClose();
  };

  if (!athlete) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-primary" />
            <span>Send Camp Invitation</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Athlete Info */}
          <Card className="p-4 bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{athlete.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-semibold">{athlete.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {athlete.district} • Score: {athlete.overallScore} • Rank: #{athlete.rank}
                </p>
              </div>
            </div>
          </Card>

          {/* Camp Details Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="campDate" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Camp Start Date</span>
                </Label>
                <Input
                  id="campDate"
                  type="date"
                  value={campDate}
                  onChange={(e) => setCampDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration</span>
                </Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 7 days"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Venue</span>
              </Label>
              <Input
                id="venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Training center location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any special instructions or requirements for the athlete..."
                rows={4}
              />
            </div>
          </div>

          {/* Preview */}
          <Card className="p-4 bg-muted/10 border-dashed">
            <h4 className="font-medium mb-2">Invitation Preview:</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Dear {athlete.name},</strong></p>
              <p>You have been selected for an official training camp:</p>
              <p>• <strong>Date:</strong> {campDate || "[Date to be selected]"}</p>
              <p>• <strong>Venue:</strong> {venue}</p>
              <p>• <strong>Duration:</strong> {duration}</p>
              {additionalNotes && <p>• <strong>Note:</strong> {additionalNotes}</p>}
              <p>Best regards,<br />Sports Authority of India</p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendInvitation} className="btn-primary">
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationModal;