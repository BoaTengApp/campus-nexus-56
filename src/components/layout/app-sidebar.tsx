import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  GraduationCap,
  CreditCard,
  Watch,
  UserCheck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuthStore } from "@/store/auth";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  permissions?: string[];
  children?: Omit<NavItem, 'children'>[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "School Management",
    url: "/schools",
    icon: Building2,
    permissions: ["SCHOOLS_VIEW", "SCHOOL_VIEW"],
    children: [
      { title: "All Schools", url: "/schools", icon: Building2, permissions: ["SCHOOLS_VIEW"] },
      { title: "Add School", url: "/schools/new", icon: Building2, permissions: ["SCHOOL_CREATE"] },
    ],
  },
  {
    title: "Student Management",
    url: "/students",
    icon: GraduationCap,
    permissions: ["STUDENT_VIEW_ALL", "STUDENT_VIEW"],
    children: [
      { title: "All Students", url: "/students", icon: GraduationCap, permissions: ["STUDENT_VIEW_ALL"] },
      { title: "Add Student", url: "/students/new", icon: GraduationCap, permissions: ["STUDENT_CREATE"] },
      { title: "Bulk Import", url: "/students/import", icon: GraduationCap, permissions: ["STUDENT_BULK_CREATE"] },
    ],
  },
  {
    title: "POS Devices",
    url: "/pos-devices",
    icon: CreditCard,
    permissions: ["POS_VIEWS", "POS_VIEW"],
    children: [
      { title: "All Devices", url: "/pos-devices", icon: CreditCard, permissions: ["POS_VIEWS"] },
      { title: "Add Device", url: "/pos-devices/new", icon: CreditCard, permissions: ["POS_CREATE"] },
    ],
  },
  {
    title: "Wristbands",
    url: "/wristbands",
    icon: Watch,
    permissions: ["WRISTBANDS_VIEW", "WRISTBAND_VIEW"],
    children: [
      { title: "All Wristbands", url: "/wristbands", icon: Watch, permissions: ["WRISTBANDS_VIEW"] },
      { title: "Add Wristband", url: "/wristbands/new", icon: Watch, permissions: ["WRISTBAND_CREATE"] },
    ],
  },
  {
    title: "Vendors",
    url: "/vendors",
    icon: Users,
    permissions: ["VENDOR_MANAGE"],
  },
  {
    title: "Parents",
    url: "/parents",
    icon: UserCheck,
    permissions: ["PARENT_MANAGE"],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "System",
    url: "/system",
    icon: Settings,
    children: [
      { title: "Users", url: "/system/users", icon: Users, permissions: ["USERS_VIEW"] },
      { title: "Roles & Permissions", url: "/system/roles", icon: Shield, permissions: ["ROLE_MANAGE"] },
      { title: "Settings", url: "/system/settings", icon: Settings },
      { title: "Terms & Conditions", url: "/system/terms", icon: FileText },
    ],
  },
];

export const AppSidebar = () => {
  const sidebar = useSidebar();
  const collapsed = sidebar.state === "collapsed";
  const location = useLocation();
  const { hasPermission, hasAnyPermission } = useAuthStore();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (item: NavItem) => {
    if (isActive(item.url)) return true;
    return item.children?.some(child => isActive(child.url)) || false;
  };

  const hasItemPermission = (item: NavItem) => {
    if (!item.permissions) return true;
    return hasAnyPermission(item.permissions as any);
  };

  const toggleGroup = (title: string) => {
    setOpenGroups(prev =>
      prev.includes(title)
        ? prev.filter(group => group !== title)
        : [...prev, title]
    );
  };

  // Filter navigation items based on permissions
  const filteredItems = navigationItems.filter(hasItemPermission);

  return (
    <Sidebar className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const filteredChildren = item.children?.filter(hasItemPermission) || [];
                const shouldShowChildren = hasChildren && filteredChildren.length > 0;
                const isGroupOpen = openGroups.includes(item.title) || isGroupActive(item);

                if (shouldShowChildren && !collapsed) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Collapsible open={isGroupOpen} onOpenChange={() => toggleGroup(item.title)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton 
                            className={`w-full justify-between transition-smooth group ${
                              isGroupActive(item) 
                                ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
                                : "hover:bg-accent/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 shrink-0" />
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <motion.div
                              animate={{ rotate: isGroupOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                            {filteredChildren.map((child) => (
                              <SidebarMenuSubItem key={child.url}>
                                <SidebarMenuSubButton 
                                  asChild
                                  className={`transition-smooth ${
                                    isActive(child.url)
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  <NavLink to={child.url}>
                                    <child.icon className="h-4 w-4 shrink-0" />
                                    <span className="text-sm">{child.title}</span>
                                  </NavLink>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={`transition-smooth ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                          : "hover:bg-accent/50"
                      }`}
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <NavLink to={item.url}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};