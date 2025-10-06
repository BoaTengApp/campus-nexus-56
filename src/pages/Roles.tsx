import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleFormDialog } from "@/components/roles/role-form-dialog";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const Roles = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();

  const allPermissions = [
    { id: "VIEW_SCHOOLS", label: "View Schools", category: "Schools" },
    { id: "MANAGE_SCHOOLS", label: "Manage Schools", category: "Schools" },
    { id: "VIEW_STUDENTS", label: "View Students", category: "Students" },
    { id: "MANAGE_STUDENTS", label: "Manage Students", category: "Students" },
    { id: "VIEW_TRANSACTIONS", label: "View Transactions", category: "Transactions" },
    { id: "MANAGE_TRANSACTIONS", label: "Manage Transactions", category: "Transactions" },
    { id: "VIEW_VENDORS", label: "View Vendors", category: "Vendors" },
    { id: "MANAGE_VENDORS", label: "Manage Vendors", category: "Vendors" },
  ];

  const roles: Role[] = [
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: allPermissions.map((p) => p.id),
      userCount: 3,
    },
    {
      id: "2",
      name: "School Admin",
      description: "Manage school-specific data and users",
      permissions: ["VIEW_STUDENTS", "MANAGE_STUDENTS", "VIEW_TRANSACTIONS"],
      userCount: 12,
    },
    {
      id: "3",
      name: "Teacher",
      description: "View and manage assigned students",
      permissions: ["VIEW_STUDENTS"],
      userCount: 45,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Roles & Permissions"
        description="Define user roles and manage access permissions"
      >
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {role.userCount} users
                    </CardDescription>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{role.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Permissions</p>
                <div className="space-y-2">
                  {allPermissions.slice(0, 3).map((permission) => (
                    <div key={permission.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={role.permissions.includes(permission.id)}
                        disabled
                      />
                      <span className="text-sm text-muted-foreground">
                        {permission.label}
                      </span>
                    </div>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedRole(role);
                  setIsFormOpen(true);
                }}
              >
                Edit Role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <RoleFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        role={selectedRole}
        allPermissions={allPermissions}
      />
    </motion.div>
  );
};

export default Roles;
