import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Wristband {
  id: number;
  serialNumber: string;
}

interface WristbandFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  wristband?: Wristband;
}

export function WristbandFormDialog({ open, onOpenChange, wristband }: WristbandFormDialogProps) {
  const isEditing = !!wristband;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Wristband" : "Add New Wristband"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update wristband information" : "Register a new wristband"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input id="serialNumber" defaultValue={wristband?.serialNumber} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Select>
                <SelectTrigger id="school">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Greenwood Academy</SelectItem>
                  <SelectItem value="2">Riverside High</SelectItem>
                  <SelectItem value="3">Mountain View School</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student">Assign to Student (Optional)</Label>
              <Select>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe - STU001</SelectItem>
                  <SelectItem value="2">Jane Smith - STU002</SelectItem>
                  <SelectItem value="3">Mike Johnson - STU003</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="available">
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="damaged">Damaged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-glow">
              {isEditing ? "Update Wristband" : "Register Wristband"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
