import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, FolderOpen, Activity } from "lucide-react";

interface SchoolVendorCategoriesTabProps {
  schoolId: number;
}

interface VendorCategory {
  id: number;
  name: string;
  description: string;
  vendorCount: number;
  status: "ACTIVE" | "INACTIVE";
}

const mockCategories: VendorCategory[] = [
  { id: 1, name: "Food & Beverages", description: "Cafeteria and snack services", vendorCount: 2, status: "ACTIVE" },
  { id: 2, name: "School Supplies", description: "Books, stationery, and materials", vendorCount: 1, status: "ACTIVE" },
  { id: 3, name: "Sports & Recreation", description: "Sports equipment and gear", vendorCount: 1, status: "ACTIVE" },
  { id: 4, name: "Uniforms", description: "School uniforms and apparel", vendorCount: 0, status: "INACTIVE" },
];

export function SchoolVendorCategoriesTab({ schoolId }: SchoolVendorCategoriesTabProps) {
  const stats = [
    { label: "Total Categories", value: mockCategories.length, icon: FolderOpen, color: "text-blue-600" },
    { label: "Active Categories", value: mockCategories.filter(c => c.status === "ACTIVE").length, icon: Activity, color: "text-green-600" },
    { label: "Total Vendors", value: mockCategories.reduce((sum, c) => sum + c.vendorCount, 0), icon: Activity, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Categories Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vendor Categories</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Manage vendor categories for this school</p>
          </div>
          <Button onClick={() => console.log("Add category")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendors</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.vendorCount} vendors</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.status === "ACTIVE" ? "default" : "secondary"}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => console.log("Edit", category.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => console.log("Delete", category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
