import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface School {
  id: number;
  name: string;
  address: string;
  studentCount: number;
}

interface Student {
  id: number;
  name: string;
  studentId: string;
  currentSchool?: string;
}

const AssignStudents = () => {
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const schools: School[] = [
    { id: 1, name: "Greenwood Academy", address: "123 Main St", studentCount: 450 },
    { id: 2, name: "Riverside High", address: "456 River Rd", studentCount: 380 },
    { id: 3, name: "Mountain View School", address: "789 Hill Ave", studentCount: 520 },
  ];

  const availableStudents: Student[] = [
    { id: 1, name: "John Doe", studentId: "STU001", currentSchool: "Unassigned" },
    { id: 2, name: "Jane Smith", studentId: "STU002", currentSchool: "Unassigned" },
    { id: 3, name: "Mike Johnson", studentId: "STU003", currentSchool: "Greenwood Academy" },
    { id: 4, name: "Sarah Williams", studentId: "STU004", currentSchool: "Unassigned" },
  ];

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssign = () => {
    console.log("Assigning students:", selectedStudents, "to school:", selectedSchool);
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-6 space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Assign Students to School</h1>
          <p className="text-muted-foreground">Select a school and students to assign</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* School Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Select School</CardTitle>
            <CardDescription>Choose the target school</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-smooth ${
                      selectedSchool?.id === school.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSchool(school)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{school.address}</p>
                        <Badge variant="secondary" className="mt-2">
                          {school.studentCount} students
                        </Badge>
                      </div>
                      {selectedSchool?.id === school.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Student Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Select Students</CardTitle>
            <CardDescription>Choose students to assign to {selectedSchool?.name || "the school"}</CardDescription>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedStudents.includes(student.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleStudentToggle(student.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{student.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {student.studentId}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Current: {student.currentSchool}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 sticky bottom-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          disabled={!selectedSchool || selectedStudents.length === 0}
          className="bg-gradient-primary hover:shadow-glow"
        >
          Assign {selectedStudents.length} Student{selectedStudents.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </motion.div>
  );
};

export default AssignStudents;
