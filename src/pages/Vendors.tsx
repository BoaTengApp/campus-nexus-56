import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash2, Eye, Users, CreditCard } from "lucide-react";
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
import { Vendor } from "@/lib/types";

// Mock data - replace with actual API calls
const mockVendors: Vendor[] = [
  {
    id: 1,
    name: "Campus Cafeteria",
    email: "cafeteria@greenwood.edu",
    phone: "+1 (555) 123-4567",
    schoolId: 1,
    schoolName: "Greenwood Academy",
    categoryId: 1,
    categoryName: "Food & Beverage",
    status: "ACTIVE",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
  },
  {
    id: 2,
    name: "Student Bookstore",
    email: "bookstore@riverside.edu",
    phone: "+1 (555) 987-6543",
    schoolId: 2,
    schoolName: "Riverside High School",
    categoryId: 2,
    categoryName: "Books & Supplies",
    status: "ACTIVE",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-18T11:20:00Z",
  },
  {
    id: 3,
    name: "Sports Equipment Shop",
    email: "sports@mountainview.edu",
    phone: "+1 (555) 456-7890",
    schoolId: 3,
    schoolName: "Mountain View Elementary",
    categoryId: 3,
    categoryName: "Sports & Recreation",
    status: "INACTIVE",
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

const categoryOptions = [
  { value: "1", label: "Food & Beverage" },
  { value: "2", label: "Books & Supplies" },
  { value: "3", label: "Sports & Recreation" },
];

const Vendors = () => {
  const { hasPermission } = useAuthStore();
  const [vendors, setVendors] = React.useState<Vendor[]>(mockVendors);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [schoolFilter, setSchoolFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const handleAdd = () => {
    console.log("Add new vendor");
    // Navigate to add vendor page
  };

  const handleEdit = (vendor: Vendor) => {
    console.log("Edit vendor:", vendor);
    // Navigate to edit vendor page
  };

  const handleDelete = (vendor: Vendor) => {
    console.log("Delete vendor:", vendor);
    // Show confirmation dialog and delete
  };

  const handleView = (vendor: Vendor) => {
    console.log("View vendor:", vendor);
    // Navigate to vendor details page
  };

  const handleAssignPOS = (vendor: Vendor) => {
    console.log("Assign POS to vendor:", vendor);
    // Navigate to assign POS page
  };

  const handleExport = () => {
    console.log("Export vendors");
    // Export functionality
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSchoolFilter("");
    setCategoryFilter("");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Vendor",
      cell: ({ row }) => {
        const vendor = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{vendor.name}</div>
              <div className="text-sm text-muted-foreground">{vendor.email}</div>
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
    },
    {
      accessorKey: "categoryName",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("categoryName") as string;
        return <Badge variant="outline">{category}</Badge>;
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
        const vendor = row.original;

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
              <DropdownMenuItem onClick={() => handleView(vendor)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {hasPermission("VENDOR_MANAGE") && (
                <>
                  <DropdownMenuItem onClick={() => handleEdit(vendor)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Vendor
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAssignPOS(vendor)}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Assign POS Device
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              {hasPermission("VENDOR_MANAGE") && (
                <DropdownMenuItem
                  onClick={() => handleDelete(vendor)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Vendor
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
  const filteredVendors = React.useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch = !search || 
        vendor.name.toLowerCase().includes(search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = !statusFilter || vendor.status === statusFilter;
      const matchesSchool = !schoolFilter || vendor.schoolId.toString() === schoolFilter;
      const matchesCategory = !categoryFilter || vendor.categoryId.toString() === categoryFilter;
      
      // Add date filtering if needed
      const matchesDateFrom = !dateFrom || new Date(vendor.createdAt) >= dateFrom;
      const matchesDateTo = !dateTo || new Date(vendor.createdAt) <= dateTo;

      return matchesSearch && matchesStatus && matchesSchool && matchesCategory && matchesDateFrom && matchesDateTo;
    });
  }, [vendors, search, statusFilter, schoolFilter, categoryFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors Management"
        description="Manage vendors and their services across schools"
        badge={`${filteredVendors.length} vendors`}
      >
        {hasPermission("VENDOR_MANAGE") && (
          <Button onClick={handleAdd} className="bg-gradient-primary hover:shadow-glow">
            <Users className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        )}
      </PageHeader>

      <FiltersBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search vendors by name or email..."
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Categories</option>
            {categoryOptions.map((option) => (
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
          data={filteredVendors}
          title="Vendors List"
          description="View and manage all vendors across schools"
          onAdd={hasPermission("VENDOR_MANAGE") ? handleAdd : undefined}
          onExport={handleExport}
          addButtonText="Add Vendor"
          showSearch={false} // We're using custom FiltersBar
        />
      </motion.div>
    </div>
  );
};

export default Vendors;