import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: string;
}

export function BulkImportDialog({ open, onOpenChange, entityType }: BulkImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    // Simulate import
    await new Promise(resolve => setTimeout(resolve, 2000));
    setImporting(false);
    onOpenChange(false);
  };

  const handleDownloadTemplate = () => {
    // Download CSV template
    const headers = entityType === "users" 
      ? "firstName,lastName,email,userType\n"
      : entityType === "students"
      ? "firstName,lastName,studentId,email,phone,schoolId\n"
      : "name,email,phone,address\n";
    
    const blob = new Blob([headers], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entityType}_template.csv`;
    a.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Import {entityType}</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import multiple {entityType} at once
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Download the template file first and fill it with your data. Make sure to follow the exact format.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleDownloadTemplate}
            >
              <Download className="h-4 w-4" />
              Download CSV Template
            </Button>

            <div className="border-2 border-dashed border-border rounded-lg p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {file ? file.name : "Choose a CSV file to upload"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum file size: 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("csv-upload")?.click()}
                >
                  Select File
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              className="bg-gradient-primary hover:shadow-glow"
            >
              <Upload className="h-4 w-4" />
              {importing ? "Importing..." : "Import"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
