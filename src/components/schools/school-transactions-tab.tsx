import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolTransactionsTabProps {
  schoolId: number;
}

export function SchoolTransactionsTab({ schoolId }: SchoolTransactionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Transactions</CardTitle>
        <CardDescription>View all transactions for this school</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Transaction list for school ID: {schoolId}</p>
      </CardContent>
    </Card>
  );
}
