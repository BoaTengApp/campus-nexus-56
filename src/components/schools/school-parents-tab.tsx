import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolParentsTabProps {
  schoolId: number;
}

export function SchoolParentsTab({ schoolId }: SchoolParentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parents</CardTitle>
        <CardDescription>Manage parents for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Parents for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
