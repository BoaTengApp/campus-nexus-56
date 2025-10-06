import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Download, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserFormDialog } from "@/components/users/user-form-dialog";
import { BulkImportDialog } from "@/components/shared/bulk-import-dialog";
import type { User } from "@/lib/types";

const Users = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  // Mock data
  const users: User[] = [
    {
      id: 1,
      email: "john.admin@school.com",
      phone: "+1234567890",
      firstName: "John",
      lastName: "Admin",
      userType: "SUPER_ADMIN",
      loginEnabled: true,
      schoolId: null,
      schoolName: null,
      roles: ["admin"],
      permissions: ["SCHOOL_VIEW", "SCHOOL_MANAGE", "STUDENT_VIEW"],
    },
    {
      id: 2,
      email: "sarah.school@greenwood.edu",
      phone: "+1234567891",
      firstName: "Sarah",
      lastName: "Wilson",
      userType: "SCHOOL_ADMIN",
      loginEnabled: true,
      schoolId: 1,
      schoolName: "Greenwood Academy",
      roles: ["school_admin"],
      permissions: ["STUDENT_VIEW", "STUDENT_MANAGE"],
    },
  ];

  const columns = [
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }: any) => (
        <div className="font-medium">
          {row.original.firstName} {row.original.lastName}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "userType",
      header: "Role",
      cell: ({ row }: any) => (
        <Badge variant="outline">
          {row.original.userType.replace("_", " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }: any) => (
        <div className="flex gap-1 flex-wrap">
          {row.original.permissions.slice(0, 2).map((permission: string) => (
            <Badge key={permission} variant="secondary" className="text-xs">
              {permission.replace("_", " ")}
            </Badge>
          ))}
          {row.original.permissions.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{row.original.permissions.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleExport = () => {
    console.log("Exporting users...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="User Management"
        description="Manage system users, roles, and permissions"
      />

      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBulkImportOpen(true)}
          >
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-gradient-primary hover:shadow-glow"
            onClick={() => {
              setSelectedUser(undefined);
              setIsFormOpen(true);
            }}
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={users}
          title="Users"
          description="Manage system users and their access"
          searchPlaceholder="Search users..."
        />
      </div>

      <UserFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        user={selectedUser}
      />

      <BulkImportDialog
        open={isBulkImportOpen}
        onOpenChange={setIsBulkImportOpen}
        entityType="users"
      />
    </motion.div>
  );
};

export default Users;
