import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  DollarSign,
  Watch,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface RecentActivity {
  id: number;
  type: 'TRANSACTION' | 'USER_CREATED' | 'SCHOOL_CREATED' | 'DEVICE_ASSIGNED';
  description: string;
  timestamp: string;
  amount?: number;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [dateRange, setDateRange] = useState("7days");

  // Mock data - replace with actual API calls
  const stats: StatCard[] = [
    {
      title: "Total Schools",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: Building2,
      description: "Active educational institutions",
    },
    {
      title: "Total Students",
      value: "8,547",
      change: "+18%",
      changeType: "positive",
      icon: GraduationCap,
      description: "Enrolled students across all schools",
    },
    {
      title: "Monthly Revenue",
      value: "$124,500",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      description: "Total revenue this month",
    },
    {
      title: "Active Wristbands",
      value: "7,234",
      change: "-2%",
      changeType: "negative",
      icon: Watch,
      description: "Currently active wristbands",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: "TRANSACTION",
      description: "Payment of $45.00 from John Doe for lunch",
      timestamp: "2 minutes ago",
      amount: 45.00,
    },
    {
      id: 2,
      type: "SCHOOL_CREATED",
      description: "New school 'Greenwood Academy' was added",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      type: "USER_CREATED",
      description: "Teacher account created for Sarah Wilson",
      timestamp: "3 hours ago",
    },
    {
      id: 4,
      type: "DEVICE_ASSIGNED",
      description: "POS device assigned to 'Main Cafeteria'",
      timestamp: "5 hours ago",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'TRANSACTION':
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'SCHOOL_CREATED':
        return <Building2 className="h-4 w-4 text-blue-500" />;
      case 'USER_CREATED':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'DEVICE_ASSIGNED':
        return <Activity className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'TRANSACTION':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'SCHOOL_CREATED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'USER_CREATED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'DEVICE_ASSIGNED':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening in your school management system today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-sm">
              {user?.userType.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <Card className="relative overflow-hidden bg-gradient-card hover:shadow-medium transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span
                    className={`font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : stat.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Transaction Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transaction Flow</CardTitle>
            <CardDescription>Money flow across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                    <ArrowDownRight className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Income</p>
                    <p className="text-2xl font-bold text-success">$45,234</p>
                  </div>
                </div>
                <Badge className="bg-success/10 text-success">+12%</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Transactions</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </div>
                </div>
                <Badge variant="secondary">This {dateRange}</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Transaction</p>
                    <p className="text-2xl font-bold">$36.35</p>
                  </div>
                </div>
                <Badge className="bg-warning/10 text-warning">-2%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Latest events across your school management system
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getActivityBadgeColor(activity.type)}`}
                        >
                          {activity.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                    {activity.amount && (
                      <div className="text-sm font-medium text-green-600">
                        +${activity.amount.toFixed(2)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow">
                <Building2 className="mr-2 h-4 w-4" />
                Add New School
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="mr-2 h-4 w-4" />
                Enroll Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Create User
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Watch className="mr-2 h-4 w-4" />
                Assign Wristband
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  ~120ms
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;