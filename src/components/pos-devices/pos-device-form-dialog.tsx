import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface POSDevice {
  id: number;
  serialNumber: string;
  name: string;
}

interface POSDeviceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device?: POSDevice;
}

export function POSDeviceFormDialog({ open, onOpenChange, device }: POSDeviceFormDialogProps) {
  const isEditing = !!device;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit POS Device" : "Add New POS Device"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update device information" : "Register a new POS device"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input id="serialNumber" defaultValue={device?.serialNumber} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input id="name" defaultValue={device?.name} required />
            </div>
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
              <Label htmlFor="vendor">Assigned Vendor</Label>
              <Select>
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Main Cafeteria</SelectItem>
                  <SelectItem value="2">Library Store</SelectItem>
                  <SelectItem value="3">Sports Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g., Main Cafeteria, Building A" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-glow">
              {isEditing ? "Update Device" : "Register Device"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
