import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, UserCheck, GraduationCap } from "lucide-react";
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
import { Parent } from "@/lib/types";

// Mock data - replace with actual API calls
const mockParents: Parent[] = [
  {
    id: 1,
    firstName: "Robert",
    lastName: "Doe",
    email: "robert.doe@email.com",
    phone: "+1 (555) 123-4567",
    schoolId: 1,
    schoolName: "Greenwood Academy",
    studentsCount: 2,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    firstName: "Lisa",
    lastName: "Brown",
    email: "lisa.brown@email.com",
    phone: "+1 (555) 987-6543",
    schoolId: 3,
    schoolName: "Mountain View Elementary",
    studentsCount: 1,
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 456-7890",
    schoolId: 2,
    schoolName: "Riverside High School",
    studentsCount: 3,
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

const Parents = () => {
  const { hasPermission } = useAuthStore();
  const [parents, setParents] = React.useState<Parent[]>(mockParents);
  const [search, setSearch] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleAdd = () => {
    console.log("Add new parent");
    // Navigate to add parent page
  };

  const handleEdit = (parent: Parent) => {
    console.log("Edit parent:", parent);
    // Navigate to edit parent page
  };

  const handleDelete = (parent: Parent) => {
    console.log("Delete parent:", parent);
    // Show confirmation dialog and delete
  };

  const handleView = (parent: Parent) => {
    console.log("View parent:", parent);
    // Navigate to parent details page
  };

  const handleAssignToStudent = (parent: Parent) => {
    console.log("Assign parent to student:", parent);
    // Navigate to assign to student page
  };

  const handleExport = () => {
    console.log("Export parents");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setSchoolFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const columns: ColumnDef<Parent>[] = [
    {
      accessorKey: "firstName",
      header: "Parent",
      cell: ({ row }) => {
        const parent = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{`${parent.firstName} ${parent.lastName}`}</div>
              <div className="text-sm text-muted-foreground">{parent.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
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
      accessorKey: "studentsCount",
      header: "Students",
      cell: ({ row }) => {
        const count = row.getValue("studentsCount") as number;
        return (
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{count}</span>
          </div>
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
        const parent = row.original;

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
              <DropdownMenuItem onClick={() => handleView(parent)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("PARENT_MANAGE") && (
                <>
                  <DropdownMenuItem onClick={() => handleEdit(parent)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Parent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAssignToStudent(parent)}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Assign to Student
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              {hasPermission("PARENT_MANAGE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(parent)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Parent
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Filter data based on current filters
  const filteredParents = React.useMemo(() => {
    return parents.filter((parent) => {
      const matchesSearch = !search || 
        parent.firstName.toLowerCase().includes(search.toLowerCase()) ||
        parent.lastName.toLowerCase().includes(search.toLowerCase()) ||
        parent.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesSchool = !schoolFilter || parent.schoolId.toString() === schoolFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(parent.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(parent.createdAt) <= dateTo;

      return matchesSearch && matchesSchool && matchesDateFrom && matchesDateTo;
    });
  }, [parents, search, schoolFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Parents Management"
        description="Manage parent accounts and their relationships with students"
        badge={`${filteredParents.length} parents`}
      >
        {hasPermission("PARENT_MANAGE") && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
            <UserCheck className="mr-2 h-4 w-4" />
            Add Parent
          </Button>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search parents by name or email..."
        showDateRange={true}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
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
          data={filteredParents}
          title="Parents List"
          description="View and manage all parent accounts in your system"
          onAdd={hasPermission("PARENT_MANAGE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add Parent"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default Parents;