import { motion } from "framer-motion";
import { FileText, Edit, Save } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const TermsConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Terms & Conditions"
        description="Manage system terms of service and privacy policies"
      >
        <Button className="bg-gradient-primary hover:shadow-glow">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </PageHeader>

      <div className="grid gap-6">
        {/* Terms of Service */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>User agreement and terms of use</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">Last updated: Jan 15, 2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="terms">Terms Content</Label>
              <Textarea
                id="terms"
                rows={12}
                className="font-mono text-sm"
                defaultValue={`1. ACCEPTANCE OF TERMS
By accessing and using this School Management System, you accept and agree to be bound by these Terms of Service.

2. USER RESPONSIBILITIES
- Maintain confidentiality of login credentials
- Use the system only for authorized purposes
- Report any security vulnerabilities immediately

3. DATA PRIVACY
- Student and parent data is protected under applicable privacy laws
- Data is encrypted both in transit and at rest
- Access is granted based on role-based permissions

4. ACCEPTABLE USE
- No unauthorized access attempts
- No data scraping or automated queries
- No malicious activities or system disruption

5. MODIFICATIONS
We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>Data collection and privacy practices</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">Last updated: Jan 15, 2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="privacy">Privacy Policy Content</Label>
              <Textarea
                id="privacy"
                rows={12}
                className="font-mono text-sm"
                defaultValue={`1. INFORMATION WE COLLECT
- Student information (name, grade, contact details)
- Parent/guardian information
- Transaction records
- System usage data

2. HOW WE USE INFORMATION
- To provide and maintain the service
- To process transactions
- To communicate with users
- To improve system functionality

3. DATA SECURITY
- Industry-standard encryption
- Regular security audits
- Access controls and authentication
- Secure data storage

4. DATA SHARING
- We do not sell user data
- Data shared only with authorized school personnel
- Third-party services used only for essential operations

5. YOUR RIGHTS
- Access your personal data
- Request data corrections
- Request data deletion
- Opt-out of non-essential communications`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use Policy */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <CardTitle>Acceptable Use Policy</CardTitle>
                  <CardDescription>Guidelines for system usage</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">Last updated: Jan 15, 2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aup">Acceptable Use Content</Label>
              <Textarea
                id="aup"
                rows={8}
                className="font-mono text-sm"
                defaultValue={`1. PERMITTED USES
- Educational and administrative purposes only
- Authorized data access within role permissions
- Professional communication

2. PROHIBITED ACTIVITIES
- Sharing login credentials
- Unauthorized data access or modification
- Harassment or inappropriate content
- System disruption or security testing

3. CONSEQUENCES
Violations may result in account suspension or termination.`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TermsConditions;
