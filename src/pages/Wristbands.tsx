import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, Watch, Building2, GraduationCap, Power, PowerOff } from "lucide-react";
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
import { Wristband } from "@/lib/types";

// Mock data - replace with actual API calls
const mockWristbands: Wristband[] = [
  {
    id: 1,
    serialNumber: "WB001234",
    schoolId: 1,
    schoolName: "Greenwood Academy",
    studentId: 1,
    studentName: "John Doe",
    status: "ACTIVE",
    isAssigned: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    serialNumber: "WB005678",
    schoolId: 2,
    schoolName: "Riverside High School",
    status: "ACTIVE",
    isAssigned: false,
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    serialNumber: "WB009876",
    schoolId: 3,
    schoolName: "Mountain View Elementary",
    studentId: 3,
    studentName: "Michael Brown",
    status: "INACTIVE",
    isAssigned: true,
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

const Wristbands = () => {
  const { hasPermission } = useAuthStore();
  const [wristbands, setWristbands] = React.useState<Wristband[]>(mockWristbands);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [assignmentFilter, setAssignmentFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleAdd = () => {
    console.log("Add new wristband");
    // Navigate to add wristband page
  };

  const handleEdit = (wristband: Wristband) => {
    console.log("Edit wristband:", wristband);
    // Navigate to edit wristband page
  };

  const handleDelete = (wristband: Wristband) => {
    console.log("Delete wristband:", wristband);
    // Show confirmation dialog and delete
  };

  const handleView = (wristband: Wristband) => {
    console.log("View wristband:", wristband);
    // Navigate to wristband details page
  };

  const handleAssignToSchool = (wristband: Wristband) => {
    console.log("Assign wristband to school:", wristband);
    // Navigate to assign to school page
  };

  const handleAssignToStudent = (wristband: Wristband) => {
    console.log("Assign wristband to student:", wristband);
    // Navigate to assign to student page
  };

  const handleToggleStatus = (wristband: Wristband) => {
    console.log("Toggle wristband status:", wristband);
    // Toggle wristband status
    setWristbands(prev => prev.map(w => 
      w.id === wristband.id 
        ? { ...w, status: w.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
        : w
    ));
  };

  const handleExport = () => {
    console.log("Export wristbands");
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

  const columns: ColumnDef<Wristband>[] = [
    {
      accessorKey: "serialNumber",
      header: "Wristband",
      cell: ({ row }) => {
        const wristband = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Watch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{wristband.serialNumber}</div>
              <div className="text-sm text-muted-foreground">ID: {wristband.id}</div>
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
      accessorKey: "studentName",
      header: "Student",
      cell: ({ row }) => {
        const studentName = row.getValue("studentName") as string;
        return studentName ? (
          <Badge variant="outline">{studentName}</Badge>
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
        const wristband = row.original;

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
              <DropdownMenuItem onClick={() => handleView(wristband)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("WRISTBAND_MANAGE") && (
                <DropdownMenuItem onClick={() => handleEdit(wristband)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Wristband
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("WRISTBAND_ASSIGN") && (
                <>
                  <DropdownMenuItem onClick={() => handleAssignToSchool(wristband)}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Assign to School
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAssignToStudent(wristband)}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Assign to Student
                  </DropdownMenuItem>
                </>
              )}
              {hasPermission("WRISTBAND_MANAGE") && (
                <DropdownMenuItem onClick={() => handleToggleStatus(wristband)}>
                  {wristband.status === "ACTIVE" ? (
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
              {hasPermission("WRISTBAND_DELETE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(wristband)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Wristband
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
  const filteredWristbands = React.useMemo(() => {
    return wristbands.filter((wristband) => {
      const matchesSearch = !search || 
        wristband.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        wristband.studentName?.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || wristband.status === statusFilter;
      const matchesSchool = !schoolFilter || wristband.schoolId?.toString() === schoolFilter;
      const matchesAssignment = !assignmentFilter || wristband.isAssigned.toString() === assignmentFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(wristband.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(wristband.createdAt) <= dateTo;

      return matchesSearch && matchesStatus && matchesSchool && matchesAssignment && matchesDateFrom && matchesDateTo;
    });
  }, [wristbands, search, statusFilter, schoolFilter, assignmentFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wristbands Management"
        description="Manage NFC wristbands for student payments and identification"
        badge={`${filteredWristbands.length} wristbands`}
      >
        {hasPermission("WRISTBAND_CREATE") && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
            <Watch className="mr-2 h-4 w-4" />
            Add Wristband
          </Button>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search wristbands by serial number or student..."
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
          data={filteredWristbands}
          title="Wristbands List"
          description="View and manage all NFC wristbands in your system"
          onAdd={hasPermission("WRISTBAND_CREATE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add Wristband"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default Wristbands;