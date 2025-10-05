import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolPOSDevicesTabProps {
  schoolId: number;
}

export function SchoolPOSDevicesTab({ schoolId }: SchoolPOSDevicesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>POS Devices</CardTitle>
        <CardDescription>Manage POS devices for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">POS devices for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
