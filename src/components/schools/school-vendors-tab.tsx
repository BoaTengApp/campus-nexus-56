import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Vendor } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Store, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

interface SchoolVendorsTabProps {
  schoolId: number;
}

const mockVendors: Vendor[] = [
  { id: 1, name: "Cafeteria Service", email: "cafeteria@school.edu", phone: "+1234567880", schoolId: 1, schoolName: "Greenwood Academy", categoryId: 1, categoryName: "Food & Beverages", status: "ACTIVE", createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z" },
  { id: 2, name: "Book Store", email: "books@school.edu", phone: "+1234567881", schoolId: 1, schoolName: "Greenwood Academy", categoryId: 2, categoryName: "School Supplies", status: "ACTIVE", createdAt: "2024-01-11T10:00:00Z", updatedAt: "2024-01-11T10:00:00Z" },
  { id: 3, name: "Sports Shop", email: "sports@school.edu", phone: "+1234567882", schoolId: 1, schoolName: "Greenwood Academy", categoryId: 3, categoryName: "Sports & Recreation", status: "ACTIVE", createdAt: "2024-01-12T10:00:00Z", updatedAt: "2024-01-12T10:00:00Z" },
  { id: 4, name: "Snack Bar", email: "snacks@school.edu", phone: "+1234567883", schoolId: 1, schoolName: "Greenwood Academy", categoryId: 1, categoryName: "Food & Beverages", status: "INACTIVE", createdAt: "2024-01-13T10:00:00Z", updatedAt: "2024-01-13T10:00:00Z" },
];

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.categoryName}</Badge>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "ACTIVE" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
];

export function SchoolVendorsTab({ schoolId }: SchoolVendorsTabProps) {
  const stats = [
    { label: "Total Vendors", value: mockVendors.length, icon: Store, color: "text-blue-600" },
    { label: "Active Vendors", value: mockVendors.filter(v => v.status === "ACTIVE").length, icon: ShoppingBag, color: "text-green-600" },
    { label: "Categories", value: new Set(mockVendors.map(v => v.categoryId)).size, icon: TrendingUp, color: "text-purple-600" },
    { label: "Revenue (Month)", value: "$12.5k", icon: DollarSign, color: "text-orange-600" },
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
        data={mockVendors}
        title="Vendors"
        description="Manage all vendors operating in this school"
        onAdd={() => console.log("Add vendor")}
        onExport={() => console.log("Export vendors")}
      />
    </div>
  );
}
