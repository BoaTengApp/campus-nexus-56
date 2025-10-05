import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Parent } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Mail, Phone } from "lucide-react";

interface SchoolParentsTabProps {
  schoolId: number;
}

const mockParents: Parent[] = [
  { id: 1, firstName: "Robert", lastName: "Doe", email: "robert.doe@email.com", phone: "+1234567890", schoolId: 1, schoolName: "Greenwood Academy", studentsCount: 2, createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z" },
  { id: 2, firstName: "Lisa", lastName: "Smith", email: "lisa.smith@email.com", phone: "+1234567891", schoolId: 1, schoolName: "Greenwood Academy", studentsCount: 1, createdAt: "2024-01-11T10:00:00Z", updatedAt: "2024-01-11T10:00:00Z" },
  { id: 3, firstName: "David", lastName: "Johnson", email: "david.j@email.com", phone: "+1234567892", schoolId: 1, schoolName: "Greenwood Academy", studentsCount: 3, createdAt: "2024-01-12T10:00:00Z", updatedAt: "2024-01-12T10:00:00Z" },
  { id: 4, firstName: "Mary", lastName: "Brown", email: "mary.brown@email.com", phone: "+1234567893", schoolId: 1, schoolName: "Greenwood Academy", studentsCount: 1, createdAt: "2024-01-13T10:00:00Z", updatedAt: "2024-01-13T10:00:00Z" },
];

const columns: ColumnDef<Parent>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "studentsCount",
    header: "Students",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.studentsCount} students</Badge>
    ),
  },
];

export function SchoolParentsTab({ schoolId }: SchoolParentsTabProps) {
  const stats = [
    { label: "Total Parents", value: mockParents.length, icon: Users, color: "text-blue-600" },
    { label: "Total Students", value: mockParents.reduce((sum, p) => sum + p.studentsCount, 0), icon: UserCheck, color: "text-green-600" },
    { label: "Verified Emails", value: mockParents.filter(p => p.email).length, icon: Mail, color: "text-purple-600" },
    { label: "Verified Phones", value: mockParents.filter(p => p.phone).length, icon: Phone, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={mockParents}
        title="Parents"
        description="Manage all parents associated with this school"
        onAdd={() => console.log("Add parent")}
        onExport={() => console.log("Export parents")}
      />
    </div>
  );
}
