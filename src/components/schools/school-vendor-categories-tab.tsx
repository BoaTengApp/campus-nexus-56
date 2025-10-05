import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolVendorCategoriesTabProps {
  schoolId: number;
}

export function SchoolVendorCategoriesTab({ schoolId }: SchoolVendorCategoriesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Categories</CardTitle>
        <CardDescription>Manage vendor categories for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Vendor categories for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
