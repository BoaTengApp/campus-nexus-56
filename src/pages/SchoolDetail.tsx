import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Edit, Trash2, Power } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import { School } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { SchoolOverviewTab } from "@/components/schools/school-overview-tab";
import { SchoolTransactionsTab } from "@/components/schools/school-transactions-tab";
import { SchoolPOSDevicesTab } from "@/components/schools/school-pos-devices-tab";
import { SchoolWristbandsTab } from "@/components/schools/school-wristbands-tab";
import { SchoolStudentsTab } from "@/components/schools/school-students-tab";
import { SchoolParentsTab } from "@/components/schools/school-parents-tab";
import { SchoolVendorsTab } from "@/components/schools/school-vendors-tab";
import { SchoolVendorCategoriesTab } from "@/components/schools/school-vendor-categories-tab";

// Mock data - replace with actual API call
const mockSchool: School = {
  id: 1,
  name: "Greenwood Academy",
  address: "123 Education Street, City Center",
  phone: "+1 (555) 123-4567",
  email: "admin@greenwood.edu",
  status: "ACTIVE",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-03-20T14:45:00Z",
};

const SchoolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasPermission } = useAuthStore();
  const { toast } = useToast();
  const [school, setSchool] = React.useState<School>(mockSchool);
  const [isActive, setIsActive] = React.useState(school.status === "ACTIVE");

  const handleBack = () => {
    navigate("/schools");
  };

  const handleEdit = () => {
    console.log("Edit school:", school);
    // Open edit dialog
  };

  const handleDelete = () => {
    console.log("Delete school:", school);
    // Show confirmation dialog
  };

  const handleStatusToggle = (checked: boolean) => {
    setIsActive(checked);
    const newStatus = checked ? "ACTIVE" : "INACTIVE";
    setSchool({ ...school, status: newStatus });
    
    toast({
      title: `School ${checked ? "activated" : "deactivated"}`,
      description: `${school.name} has been ${checked ? "activated" : "deactivated"} successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{school.name}</h1>
              <p className="text-muted-foreground mt-1">{school.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  variant={school.status === "ACTIVE" ? "default" : "secondary"}
                  className={
                    school.status === "ACTIVE"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  }
                >
                  {school.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {new Date(school.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasPermission("SCHOOL_UPDATE") && (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
                <Power className="h-4 w-4" />
                <Label htmlFor="school-status" className="cursor-pointer">
                  {isActive ? "Active" : "Inactive"}
                </Label>
                <Switch
                  id="school-status"
                  checked={isActive}
                  onCheckedChange={handleStatusToggle}
                />
              </div>
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </>
          )}
          {hasPermission("SCHOOL_DELETE") && (
            <Button variant="outline" onClick={handleDelete} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="pos-devices">POS Devices</TabsTrigger>
            <TabsTrigger value="wristbands">Wristbands</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SchoolOverviewTab school={school} />
          </TabsContent>

          <TabsContent value="transactions">
            <SchoolTransactionsTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="pos-devices">
            <SchoolPOSDevicesTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="wristbands">
            <SchoolWristbandsTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="students">
            <SchoolStudentsTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="parents">
            <SchoolParentsTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="vendors">
            <SchoolVendorsTab schoolId={school.id} />
          </TabsContent>

          <TabsContent value="categories">
            <SchoolVendorCategoriesTab schoolId={school.id} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SchoolDetail;
