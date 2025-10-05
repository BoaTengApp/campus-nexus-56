import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, CreditCard, Activity } from "lucide-react";

interface Transaction {
  id: number;
  transactionId: string;
  studentName: string;
  vendorName: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  date: string;
}

interface SchoolTransactionsTabProps {
  schoolId: number;
}

const mockTransactions: Transaction[] = [
  { id: 1, transactionId: "TXN001", studentName: "John Doe", vendorName: "Cafeteria Service", amount: 12.50, status: "COMPLETED", date: "2024-03-20T10:30:00Z" },
  { id: 2, transactionId: "TXN002", studentName: "Jane Smith", vendorName: "Book Store", amount: 45.00, status: "COMPLETED", date: "2024-03-20T11:15:00Z" },
  { id: 3, transactionId: "TXN003", studentName: "Mike Johnson", vendorName: "Sports Shop", amount: 28.75, status: "PENDING", date: "2024-03-20T12:00:00Z" },
  { id: 4, transactionId: "TXN004", studentName: "Emily Brown", vendorName: "Cafeteria Service", amount: 8.25, status: "COMPLETED", date: "2024-03-20T13:45:00Z" },
  { id: 5, transactionId: "TXN005", studentName: "Sarah Davis", vendorName: "Snack Bar", amount: 5.50, status: "FAILED", date: "2024-03-20T14:20:00Z" },
];

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "studentName",
    header: "Student",
  },
  {
    accessorKey: "vendorName",
    header: "Vendor",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleString(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusColors = {
        COMPLETED: "default",
        PENDING: "secondary",
        FAILED: "destructive",
      };
      return (
        <Badge variant={statusColors[row.original.status] as any}>
          {row.original.status}
        </Badge>
      );
    },
  },
];

export function SchoolTransactionsTab({ schoolId }: SchoolTransactionsTabProps) {
  const totalAmount = mockTransactions.reduce((sum, t) => t.status === "COMPLETED" ? sum + t.amount : sum, 0);
  const stats = [
    { label: "Total Transactions", value: mockTransactions.length, icon: Activity, color: "text-blue-600" },
    { label: "Total Revenue", value: `$${totalAmount.toFixed(2)}`, icon: DollarSign, color: "text-green-600" },
    { label: "Completed", value: mockTransactions.filter(t => t.status === "COMPLETED").length, icon: CreditCard, color: "text-purple-600" },
    { label: "Avg. Transaction", value: `$${(totalAmount / mockTransactions.filter(t => t.status === "COMPLETED").length).toFixed(2)}`, icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={mockTransactions}
        title="Transactions"
        description="View all transactions made at this school"
        onExport={() => console.log("Export transactions")}
      />
    </div>
  );
}
