import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { POSDevice } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, XCircle, Activity } from "lucide-react";

interface SchoolPOSDevicesTabProps {
  schoolId: number;
}

const mockPOSDevices: POSDevice[] = [
  { id: 1, serialNumber: "POS001", name: "Cafeteria Counter 1", vendorId: 1, vendorName: "Cafeteria Service", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z" },
  { id: 2, serialNumber: "POS002", name: "Cafeteria Counter 2", vendorId: 1, vendorName: "Cafeteria Service", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-11T10:00:00Z", updatedAt: "2024-01-11T10:00:00Z" },
  { id: 3, serialNumber: "POS003", name: "Book Store", vendorId: 2, vendorName: "Book Store", schoolId: 1, schoolName: "Greenwood Academy", status: "ACTIVE", isAssigned: true, createdAt: "2024-01-12T10:00:00Z", updatedAt: "2024-01-12T10:00:00Z" },
  { id: 4, serialNumber: "POS004", name: "Sports Shop", vendorId: 3, vendorName: "Sports Shop", schoolId: 1, schoolName: "Greenwood Academy", status: "INACTIVE", isAssigned: false, createdAt: "2024-01-13T10:00:00Z", updatedAt: "2024-01-13T10:00:00Z" },
];

const columns: ColumnDef<POSDevice>[] = [
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "name",
    header: "Device Name",
  },
  {
    accessorKey: "vendorName",
    header: "Vendor",
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];

export function SchoolPOSDevicesTab({ schoolId }: SchoolPOSDevicesTabProps) {
  const stats = [
    { label: "Total Devices", value: mockPOSDevices.length, icon: Smartphone, color: "text-blue-600" },
    { label: "Active Devices", value: mockPOSDevices.filter(d => d.status === "ACTIVE").length, icon: CheckCircle, color: "text-green-600" },
    { label: "Inactive Devices", value: mockPOSDevices.filter(d => d.status === "INACTIVE").length, icon: XCircle, color: "text-orange-600" },
    { label: "Transactions Today", value: "247", icon: Activity, color: "text-purple-600" },
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
        data={mockPOSDevices}
        title="POS Devices"
        description="Manage all POS devices in this school"
        onAdd={() => console.log("Add POS device")}
        onExport={() => console.log("Export POS devices")}
      />
    </div>
  );
}
