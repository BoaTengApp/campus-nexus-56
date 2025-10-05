import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolStudentsTabProps {
  schoolId: number;
}

export function SchoolStudentsTab({ schoolId }: SchoolStudentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>Manage students for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Students for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
