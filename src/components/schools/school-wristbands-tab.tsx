import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Wristband } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Watch, CheckCircle, XCircle, Users } from "lucide-react";

interface SchoolWristbandsTabProps {
  schoolId: number;
}

const mockWristbands: Wristband[] = [
  { id: 1, serialNumber: "WB001", studentId: 1, studentName: "John Doe", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-03-20T10:00:00Z" },
  { id: 2, serialNumber: "WB002", studentId: 2, studentName: "Jane Smith", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-11T10:00:00Z", updatedAt: "2024-03-19T14:00:00Z" },
  { id: 3, serialNumber: "WB003", studentId: 3, studentName: "Mike Johnson", schoolId: 1, schoolName: "Greenwood Academy", status: "INACTIVE", isAssigned: true, createdAt: "2024-01-12T10:00:00Z", updatedAt: "2024-03-15T10:00:00Z" },
  { id: 4, serialNumber: "WB004", studentId: 4, studentName: "Emily Brown", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-13T10:00:00Z", updatedAt: "2024-03-20T12:00:00Z" },
  { id: 5, serialNumber: "WB005", studentId: 5, studentName: "Sarah Davis", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-14T10:00:00Z", updatedAt: "2024-03-20T09:00:00Z" },
];

const columns: ColumnDef<Wristband>[] = [
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
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
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleDateString(),
  },
];

export function SchoolWristbandsTab({ schoolId }: SchoolWristbandsTabProps) {
  const stats = [
    { label: "Total Wristbands", value: mockWristbands.length, icon: Watch, color: "text-blue-600" },
    { label: "Active Wristbands", value: mockWristbands.filter(w => w.status === "ACTIVE").length, icon: CheckCircle, color: "text-green-600" },
    { label: "Assigned", value: mockWristbands.filter(w => w.isAssigned).length, icon: Users, color: "text-purple-600" },
    { label: "Unassigned", value: mockWristbands.filter(w => !w.isAssigned).length, icon: XCircle, color: "text-orange-600" },
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
        data={mockWristbands}
        title="Wristbands"
        description="Manage all wristbands issued to students in this school"
        onAdd={() => console.log("Add wristband")}
        onExport={() => console.log("Export wristbands")}
      />
    </div>
  );
}
