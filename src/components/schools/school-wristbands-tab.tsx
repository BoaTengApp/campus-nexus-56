import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolWristbandsTabProps {
  schoolId: number;
}

export function SchoolWristbandsTab({ schoolId }: SchoolWristbandsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wristbands</CardTitle>
        <CardDescription>Manage wristbands for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Wristbands for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
