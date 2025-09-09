import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, CreditCard, Building2, Users, Power, PowerOff } from "lucide-react";
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
import { POSDevice } from "@/lib/types";

// Mock data - replace with actual API calls
const mockPOSDevices: POSDevice[] = [
  {
    id: 1,
    serialNumber: "POS001234",
    name: "Main Cafeteria Terminal",
    schoolId: 1,
    schoolName: "Greenwood Academy",
    vendorId: 1,
    vendorName: "Campus Cafeteria",
    status: "ACTIVE",
    isAssigned: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    serialNumber: "POS005678",
    name: "Bookstore Counter",
    schoolId: 2,
    schoolName: "Riverside High School",
    vendorId: 2,
    vendorName: "Student Bookstore",
    status: "ACTIVE",
    isAssigned: true,
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    serialNumber: "POS009876",
    name: "Spare Terminal #1",
    status: "INACTIVE",
    isAssigned: false,
    createdAt: "2023-12-10T16:00:00Z",
    updatedAt: "2024-01-25T08:30:00Z",
  },
];

// Mock school options for filter
const schoolOptions = [
  { value: "1", label: "Greenwood Academy" },
  { value: "2", label: "Riverside High School" },
  { value: "3", label: "Mountain View Elementary" },
];

const POSDevices = () => {
  const { hasPermission } = useAuthStore();
  const [devices, setDevices] = React.useState<POSDevice[]>(mockPOSDevices);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [assignmentFilter, setAssignmentFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleAdd = () => {
    console.log("Add new POS device");
    // Navigate to add POS device page
  };

  const handleEdit = (device: POSDevice) => {
    console.log("Edit POS device:", device);
    // Navigate to edit POS device page
  };

  const handleDelete = (device: POSDevice) => {
    console.log("Delete POS device:", device);
    // Show confirmation dialog and delete
  };

  const handleView = (device: POSDevice) => {
    console.log("View POS device:", device);
    // Navigate to POS device details page
  };

  const handleAssignToSchool = (device: POSDevice) => {
    console.log("Assign POS device to school:", device);
    // Navigate to assign to school page
  };

  const handleAssignToVendor = (device: POSDevice) => {
    console.log("Assign POS device to vendor:", device);
    // Navigate to assign to vendor page
  };

  const handleToggleStatus = (device: POSDevice) => {
    console.log("Toggle POS device status:", device);
    // Toggle device status
    setDevices(prev => prev.map(d => 
      d.id === device.id 
        ? { ...d, status: d.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
        : d
    ));
  };

  const handleExport = () => {
    console.log("Export POS devices");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSchoolFilter("");
    setAssignmentFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const columns: ColumnDef<POSDevice>[] = [
    {
      accessorKey: "name",
      header: "Device",
      cell: ({ row }) => {
        const device = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{device.name}</div>
              <div className="text-sm text-muted-foreground">{device.serialNumber}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "schoolName",
      header: "School",
      cell: ({ row }) => {
        const schoolName = row.getValue("schoolName") as string;
        return schoolName ? (
          <Badge variant="outline">{schoolName}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        );
      },
    },
    {
      accessorKey: "vendorName",
      header: "Vendor",
      cell: ({ row }) => {
        const vendorName = row.getValue("vendorName") as string;
        return vendorName ? (
          <Badge variant="outline">{vendorName}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        );
      },
    },
    {
      accessorKey: "isAssigned",
      header: "Assignment",
      cell: ({ row }) => {
        const isAssigned = row.getValue("isAssigned") as boolean;
        return (
          <Badge
            variant={isAssigned ? "default" : "secondary"}
            className={
              isAssigned
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }
          >
            {isAssigned ? "Assigned" : "Available"}
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
          <Badge
            variant={status === "ACTIVE" ? "default" : "secondary"}
            className={
              status === "ACTIVE"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const device = row.original;

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
              <DropdownMenuItem onClick={() => handleView(device)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("POS_UPDATE") && (
                <DropdownMenuItem onClick={() => handleEdit(device)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Device
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("POS_REASSIGN") && (
                <>
                  <DropdownMenuItem onClick={() => handleAssignToSchool(device)}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Assign to School
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAssignToVendor(device)}>
                    <Users className="mr-2 h-4 w-4" />
                    Assign to Vendor
                  </DropdownMenuItem>
                </>
              )}
              {hasPermission("POS_UPDATE") && (
                <DropdownMenuItem onClick={() => handleToggleStatus(device)}>
                  {device.status === "ACTIVE" ? (
                    <>
                      <PowerOff className="mr-2 h-4 w-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Power className="mr-2 h-4 w-4" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("POS_DELETE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(device)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Device
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const statusOptions = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ];

  const assignmentOptions = [
    { value: "true", label: "Assigned" },
    { value: "false", label: "Available" },
  ];

  // Filter data based on current filters
  const filteredDevices = React.useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch = !search || 
        device.name.toLowerCase().includes(search.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || device.status === statusFilter;
      const matchesSchool = !schoolFilter || device.schoolId?.toString() === schoolFilter;
      const matchesAssignment = !assignmentFilter || device.isAssigned.toString() === assignmentFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(device.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(device.createdAt) <= dateTo;

      return matchesSearch && matchesStatus && matchesSchool && matchesAssignment && matchesDateFrom && matchesDateTo;
    });
  }, [devices, search, statusFilter, schoolFilter, assignmentFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="POS Devices Management"
        description="Manage point-of-sale devices across schools and vendors"
        badge={`${filteredDevices.length} devices`}
      >
        {hasPermission("POS_CREATE") && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
            <CreditCard className="mr-2 h-4 w-4" />
            Add POS Device
          </Button>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search devices by name or serial number..."
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
            value={assignmentFilter}
            onChange={(e) => setAssignmentFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Assignments</option>
            {assignmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredDevices}
          title="POS Devices List"
          description="View and manage all POS devices in your system"
          onAdd={hasPermission("POS_CREATE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add Device"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default POSDevices;