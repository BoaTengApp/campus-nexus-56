import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolVendorsTabProps {
  schoolId: number;
}

export function SchoolVendorsTab({ schoolId }: SchoolVendorsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendors</CardTitle>
        <CardDescription>Manage vendors for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Vendors for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
