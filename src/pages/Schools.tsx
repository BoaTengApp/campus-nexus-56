import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, Building2, Upload, Power } from "lucide-react";
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
import { School } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { SchoolFormDialog } from "@/components/schools/school-form-dialog";
import { BulkUploadDialog } from "@/components/schools/bulk-upload-dialog";
import { Switch } from "@/components/ui/switch";

// Mock data - replace with actual API calls
const mockSchools: School[] = [
  {
    id: 1,
    name: "Greenwood Academy",
    address: "123 Education Street, City Center",
    phone: "+1 (555) 123-4567",
    email: "admin@greenwood.edu",
    status: "ACTIVE",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    name: "Riverside High School",
    address: "456 River Road, Riverside District",
    phone: "+1 (555) 987-6543",
    email: "contact@riverside.edu",
    status: "ACTIVE",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    name: "Mountain View Elementary",
    address: "789 Mountain Drive, Highland Area",
    phone: "+1 (555) 456-7890",
    email: "info@mountainview.edu",
    status: "INACTIVE",
    createdAt: "2023-12-10T16:00:00Z",
    updatedAt: "2024-01-25T08:30:00Z",
  },
];

const Schools = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuthStore();
  const { toast } = useToast();
  const [schools, setSchools] = React.useState<School[]>(mockSchools);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();
  const [showAddDialog, setShowAddDialog] = React.useState(false);
  const [showBulkDialog, setShowBulkDialog] = React.useState(false);
  const [editingSchool, setEditingSchool] = React.useState<School | undefined>();

  const handleAdd = () => {
    setEditingSchool(undefined);
    setShowAddDialog(true);
  };

  const handleBulkUpload = () => {
    setShowBulkDialog(true);
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setShowAddDialog(true);
  };

  const handleDelete = (school: School) => {
    console.log("Delete school:", school);
    // Show confirmation dialog and delete
    toast({
      title: "School deleted",
      description: `${school.name} has been deleted successfully.`,
    });
  };

  const handleView = (school: School) => {
    navigate(`/schools/${school.id}`);
  };

  const handleStatusToggle = (school: School, checked: boolean) => {
    const newStatus = checked ? "ACTIVE" : "INACTIVE";
    setSchools(schools.map(s => 
      s.id === school.id ? { ...s, status: newStatus } : s
    ));
    
    toast({
      title: `School ${checked ? "activated" : "deactivated"}`,
      description: `${school.name} has been ${checked ? "activated" : "deactivated"} successfully.`,
    });
  };

  const handleExport = () => {
    console.log("Export schools");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const columns: ColumnDef<School>[] = [
    {
      accessorKey: "name",
      header: "School Name",
      cell: ({ row }) => {
        const school = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{school.name}</div>
              <div className="text-sm text-muted-foreground">{school.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const school = row.original;
        const isActive = school.status === "ACTIVE";
        
        if (!hasPermission("SCHOOL_UPDATE")) {
          return (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
              }
            >
              {school.status}
            </Badge>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => handleStatusToggle(school, checked)}
            />
            <span className="text-sm">{isActive ? "Active" : "Inactive"}</span>
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
        const school = row.original;

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
              <DropdownMenuItem onClick={() => handleView(school)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("SCHOOL_UPDATE") && (
                <DropdownMenuItem onClick={() => handleEdit(school)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit School
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {hasPermission("SCHOOL_DELETE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(school)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete School
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
  const filteredSchools = React.useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch = !search || 
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.email.toLowerCase().includes(search.toLowerCase()) ||
        school.address.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || school.status === statusFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(school.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(school.createdAt) <= dateTo;

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [schools, search, statusFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools Management"
        description="Manage educational institutions in your system"
        badge={`${filteredSchools.length} schools`}
      >
        {hasPermission("SCHOOL_CREATE") && (
          <div className="flex gap-2">
            <Button onClick={handleBulkUpload} variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
            <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
              <Building2 className="mr-2 h-4 w-4" />
              Add School
            </Button>
          </div>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search schools by name, email, or address..."
        showDateRange={true}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        statusOptions={statusOptions}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DataTable
          columns={columns}
          data={filteredSchools}
          title="Schools List"
          description="View and manage all schools in your system"
          onAdd={hasPermission("SCHOOL_CREATE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add School"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>

      {/* Dialogs */}
      <SchoolFormDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        school={editingSchool}
        onSuccess={() => {
          // Refresh schools list
          console.log("School saved successfully");
        }}
      />

      <BulkUploadDialog
        open={showBulkDialog}
        onOpenChange={setShowBulkDialog}
        onSuccess={() => {
          // Refresh schools list
          console.log("Bulk upload completed");
        }}
      />
    </div>
  );
};

export default Schools;