import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, GraduationCap, Wallet, UserPlus, Watch } from "lucide-react";
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
import { Student } from "@/lib/types";

// Mock data - replace with actual API calls
const mockStudents: Student[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    studentId: "STU2024001",
    email: "john.doe@greenwood.edu",
    phone: "+1 (555) 123-4567",
    schoolId: 1,
    schoolName: "Greenwood Academy",
    parentId: 1,
    parentName: "Robert Doe",
    wristbandId: 101,
    wristbandSerial: "WB001234",
    status: "ACTIVE",
    walletBalance: 125.50,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    studentId: "STU2024002",
    email: "sarah.johnson@riverside.edu",
    schoolId: 2,
    schoolName: "Riverside High School",
    status: "ACTIVE",
    walletBalance: 89.75,
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    studentId: "STU2024003",
    email: "michael.brown@mountainview.edu",
    phone: "+1 (555) 789-0123",
    schoolId: 3,
    schoolName: "Mountain View Elementary",
    parentId: 2,
    parentName: "Lisa Brown",
    status: "INACTIVE",
    walletBalance: 0.00,
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

const Students = () => {
  const { hasPermission } = useAuthStore();
  const [students, setStudents] = React.useState<Student[]>(mockStudents);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleAdd = () => {
    console.log("Add new student");
    // Navigate to add student page
  };

  const handleEdit = (student: Student) => {
    console.log("Edit student:", student);
    // Navigate to edit student page
  };

  const handleDelete = (student: Student) => {
    console.log("Delete student:", student);
    // Show confirmation dialog and delete
  };

  const handleView = (student: Student) => {
    console.log("View student:", student);
    // Navigate to student details page
  };

  const handleAssignParent = (student: Student) => {
    console.log("Assign parent to student:", student);
    // Navigate to assign parent page
  };

  const handleAssignWristband = (student: Student) => {
    console.log("Assign wristband to student:", student);
    // Navigate to assign wristband page
  };

  const handleExport = () => {
    console.log("Export students");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSchoolFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "firstName",
      header: "Student",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{`${student.firstName} ${student.lastName}`}</div>
              <div className="text-sm text-muted-foreground">{student.studentId}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div>
            <div className="text-sm">{student.email || "No email"}</div>
            <div className="text-sm text-muted-foreground">{student.phone || "No phone"}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "schoolName",
      header: "School",
    },
    {
      accessorKey: "parentName",
      header: "Parent",
      cell: ({ row }) => {
        const parentName = row.getValue("parentName") as string;
        return parentName ? (
          <Badge variant="outline">{parentName}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">No parent assigned</span>
        );
      },
    },
    {
      accessorKey: "wristbandSerial",
      header: "Wristband",
      cell: ({ row }) => {
        const wristbandSerial = row.getValue("wristbandSerial") as string;
        return wristbandSerial ? (
          <Badge variant="outline">{wristbandSerial}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">No wristband</span>
        );
      },
    },
    {
      accessorKey: "walletBalance",
      header: "Wallet Balance",
      cell: ({ row }) => {
        const balance = row.getValue("walletBalance") as number;
        return (
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-green-600" />
            <span className="font-medium">${balance.toFixed(2)}</span>
          </div>
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const student = row.original;

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
              <DropdownMenuItem onClick={() => handleView(student)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("STUDENT_UPDATE") && (
                <DropdownMenuItem onClick={() => handleEdit(student)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Student
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("STUDENT_PARENT_REASSIGN") && (
                <DropdownMenuItem onClick={() => handleAssignParent(student)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Assign Parent
                </DropdownMenuItem>
              )}
              {hasPermission("WRISTBAND_ASSIGN") && (
                <DropdownMenuItem onClick={() => handleAssignWristband(student)}>
                  <Watch className="mr-2 h-4 w-4" />
                  Assign Wristband
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("STUDENT_DELETE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(student)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Student
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

  // Filter data based on current filters
  const filteredStudents = React.useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = !search || 
        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
        student.lastName.toLowerCase().includes(search.toLowerCase()) ||
        student.studentId.toLowerCase().includes(search.toLowerCase()) ||
        student.email?.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || student.status === statusFilter;
      const matchesSchool = !schoolFilter || student.schoolId.toString() === schoolFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(student.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(student.createdAt) <= dateTo;

      return matchesSearch && matchesStatus && matchesSchool && matchesDateFrom && matchesDateTo;
    });
  }, [students, search, statusFilter, schoolFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Management"
        description="Manage student enrollment and information"
        badge={`${filteredStudents.length} students`}
      >
        {hasPermission("STUDENT_CREATE") && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
            <GraduationCap className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search students by name, ID, or email..."
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
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredStudents}
          title="Students List"
          description="View and manage all students across schools"
          onAdd={hasPermission("STUDENT_CREATE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add Student"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default Students;