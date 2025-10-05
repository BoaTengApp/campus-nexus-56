import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, Activity } from "lucide-react";

interface SchoolStudentsTabProps {
  schoolId: number;
}

const mockStudents: Student[] = [
  { id: 1, firstName: "John", lastName: "Doe", studentId: "STU001", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", walletBalance: 45.50, createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z" },
  { id: 2, firstName: "Jane", lastName: "Smith", studentId: "STU002", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", walletBalance: 32.75, createdAt: "2024-01-11T10:00:00Z", updatedAt: "2024-01-11T10:00:00Z" },
  { id: 3, firstName: "Mike", lastName: "Johnson", studentId: "STU003", schoolId: 1, schoolName: "Greenwood Academy", status: "INACTIVE", walletBalance: 0.00, createdAt: "2024-01-12T10:00:00Z", updatedAt: "2024-01-12T10:00:00Z" },
  { id: 4, firstName: "Emily", lastName: "Brown", studentId: "STU004", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", walletBalance: 28.00, createdAt: "2024-01-13T10:00:00Z", updatedAt: "2024-01-13T10:00:00Z" },
  { id: 5, firstName: "Sarah", lastName: "Davis", studentId: "STU005", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", walletBalance: 15.25, createdAt: "2024-01-14T10:00:00Z", updatedAt: "2024-01-14T10:00:00Z" },
];

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => `$${row.original.walletBalance.toFixed(2)}`,
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

export function SchoolStudentsTab({ schoolId }: SchoolStudentsTabProps) {
  const stats = [
    { label: "Total Students", value: mockStudents.length, icon: Users, color: "text-blue-600" },
    { label: "Active Students", value: mockStudents.filter(s => s.status === "ACTIVE").length, icon: UserCheck, color: "text-green-600" },
    { label: "Inactive Students", value: mockStudents.filter(s => s.status === "INACTIVE").length, icon: UserX, color: "text-orange-600" },
    { label: "Average Age", value: "13.2", icon: Activity, color: "text-purple-600" },
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
        data={mockStudents}
        title="Students"
        description="Manage all students enrolled in this school"
        onAdd={() => console.log("Add student")}
        onExport={() => console.log("Export students")}
      />
    </div>
  );
}
