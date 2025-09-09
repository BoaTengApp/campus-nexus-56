import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, RefreshCw, Download, CreditCard, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { FiltersBar } from "@/components/shared/filters-bar";
import { useAuthStore } from "@/store/auth";

// Transaction interface
interface Transaction {
  id: number;
  transactionId: string;
  studentName: string;
  studentId: string;
  vendorName: string;
  amount: number;
  type: "PAYMENT" | "REFUND" | "TOP_UP";
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
  description: string;
  timestamp: string;
  schoolName: string;
  paymentMethod: "WRISTBAND" | "CARD" | "CASH";
}

// Mock data - replace with actual API calls
const mockTransactions: Transaction[] = [
  {
    id: 1,
    transactionId: "TXN001234",
    studentName: "John Doe",
    studentId: "STU2024001",
    vendorName: "Campus Cafeteria",
    amount: 12.50,
    type: "PAYMENT",
    status: "COMPLETED",
    description: "Lunch purchase - Burger combo meal",
    timestamp: "2024-03-20T12:30:00Z",
    schoolName: "Greenwood Academy",
    paymentMethod: "WRISTBAND",
  },
  {
    id: 2,
    transactionId: "TXN001235",
    studentName: "Sarah Johnson",
    studentId: "STU2024002",
    vendorName: "Student Bookstore",
    amount: 45.00,
    type: "PAYMENT",
    status: "COMPLETED",
    description: "Textbook purchase - Mathematics Grade 10",
    timestamp: "2024-03-20T10:15:00Z",
    schoolName: "Riverside High School",
    paymentMethod: "WRISTBAND",
  },
  {
    id: 3,
    transactionId: "TXN001236",
    studentName: "Michael Brown",
    studentId: "STU2024003",
    vendorName: "Sports Equipment Shop",
    amount: 25.00,
    type: "REFUND",
    status: "PENDING",
    description: "Refund for returned soccer ball",
    timestamp: "2024-03-20T14:45:00Z",
    schoolName: "Mountain View Elementary",
    paymentMethod: "WRISTBAND",
  },
  {
    id: 4,
    transactionId: "TXN001237",
    studentName: "Emily Davis",
    studentId: "STU2024004",
    vendorName: "Parent Account",
    amount: 100.00,
    type: "TOP_UP",
    status: "COMPLETED",
    description: "Wallet top-up from parent account",
    timestamp: "2024-03-20T09:00:00Z",
    schoolName: "Greenwood Academy",
    paymentMethod: "CARD",
  },
  {
    id: 5,
    transactionId: "TXN001238",
    studentName: "Alex Wilson",
    studentId: "STU2024005",
    vendorName: "Campus Cafeteria",
    amount: 8.75,
    type: "PAYMENT",
    status: "FAILED",
    description: "Insufficient balance - Snack purchase",
    timestamp: "2024-03-20T15:20:00Z",
    schoolName: "Riverside High School",
    paymentMethod: "WRISTBAND",
  },
];

// Mock options for filters
const schoolOptions = [
  { value: "1", label: "Greenwood Academy" },
  { value: "2", label: "Riverside High School" },
  { value: "3", label: "Mountain View Elementary" },
];

const Transactions = () => {
  const { hasPermission } = useAuthStore();
  const [transactions, setTransactions] = React.useState<Transaction[]>(mockTransactions);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleView = (transaction: Transaction) => {
    console.log("View transaction:", transaction);
    // Navigate to transaction details page
  };

  const handleRefund = (transaction: Transaction) => {
    console.log("Process refund for transaction:", transaction);
    // Process refund logic
  };

  const handleExport = () => {
    console.log("Export transactions");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setTypeFilter("");
    setSchoolFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PAYMENT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "REFUND":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "TOP_UP":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "transactionId",
      header: "Transaction",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{transaction.transactionId}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(transaction.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "studentName",
      header: "Student",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div>
            <div className="font-medium">{transaction.studentName}</div>
            <div className="text-sm text-muted-foreground">{transaction.studentId}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "vendorName",
      header: "Vendor",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const type = row.original.type;
        const isNegative = type === "PAYMENT";
        return (
          <div className={`font-medium ${isNegative ? "text-red-600" : "text-green-600"}`}>
            {isNegative ? "-" : "+"}${amount.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return (
          <Badge variant="secondary" className={getTypeColor(type)}>
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Method",
      cell: ({ row }) => {
        const method = row.getValue("paymentMethod") as string;
        return <Badge variant="outline">{method}</Badge>;
      },
    },
    {
      accessorKey: "schoolName",
      header: "School",
      cell: ({ row }) => {
        const schoolName = row.getValue("schoolName") as string;
        return <Badge variant="outline">{schoolName}</Badge>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const transaction = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(transaction)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {transaction.type === "PAYMENT" && 
               transaction.status === "COMPLETED" && 
               hasPermission("WALLET_MANAGE") && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRefund(transaction)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Process Refund
                  </DropdownMenuItem>
                </>
              )}
              {transaction.status === "FAILED" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    View Error Details
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const statusOptions = [
    { value: "COMPLETED", label: "Completed" },
    { value: "PENDING", label: "Pending" },
    { value: "FAILED", label: "Failed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  const typeOptions = [
    { value: "PAYMENT", label: "Payment" },
    { value: "REFUND", label: "Refund" },
    { value: "TOP_UP", label: "Top Up" },
  ];

  // Filter data based on current filters
  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = !search || 
        transaction.transactionId.toLowerCase().includes(search.toLowerCase()) ||
        transaction.studentName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.vendorName.toLowerCase().includes(search.toLowerCase()) ||
        transaction.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || transaction.status === statusFilter;
      const matchesType = !typeFilter || transaction.type === typeFilter;
      const matchesSchool = !schoolFilter || transaction.schoolName.includes(schoolFilter);
      
      const matchesDateFrom = !dateFrom || new Date(transaction.timestamp) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(transaction.timestamp) <= dateTo;

      return matchesSearch && matchesStatus && matchesType && matchesSchool && matchesDateFrom && matchesDateTo;
    });
  }, [transactions, search, statusFilter, typeFilter, schoolFilter, dateFrom, dateTo]);

  // Calculate summary stats
  const summaryStats = React.useMemo(() => {
    const total = filteredTransactions.reduce((sum, t) => {
      if (t.type === "PAYMENT" && t.status === "COMPLETED") return sum + t.amount;
      if (t.type === "TOP_UP" && t.status === "COMPLETED") return sum + t.amount;
      if (t.type === "REFUND" && t.status === "COMPLETED") return sum - t.amount;
      return sum;
    }, 0);

    return {
      totalTransactions: filteredTransactions.length,
      totalAmount: total,
      completedTransactions: filteredTransactions.filter(t => t.status === "COMPLETED").length,
      failedTransactions: filteredTransactions.filter(t => t.status === "FAILED").length,
    };
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Monitor and manage all financial transactions"
        badge={`${filteredTransactions.length} transactions`}
      >
        <Button onClick={handleExport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by transaction ID, student, vendor, or description..."
        showDateRange={true}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        statusOptions={statusOptions}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        schoolOptions={schoolOptions}
        schoolValue={schoolFilter}
        onSchoolChange={setSchoolFilter}
        onClearFilters={handleClearFilters}
        customFilters={
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Types</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        }
      />

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground">Total Volume</div>
          <div className="text-2xl font-bold">${summaryStats.totalAmount.toFixed(2)}</div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground">Total Count</div>
          <div className="text-2xl font-bold">{summaryStats.totalTransactions}</div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground">Completed</div>
          <div className="text-2xl font-bold text-green-600">{summaryStats.completedTransactions}</div>
        </div>
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground">Failed</div>
          <div className="text-2xl font-bold text-red-600">{summaryStats.failedTransactions}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredTransactions}
          title="Transaction History"
          description="Complete transaction log with filtering and search capabilities"
          onExport={handleExport}
          showAdd={false} // Transactions are created by the system, not manually
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default Transactions;