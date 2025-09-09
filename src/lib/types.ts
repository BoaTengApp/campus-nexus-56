// Core Types for School Management System

export type UserType = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'HOUSEMASTER';

export interface User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  loginEnabled: boolean;
  schoolId: number | null;
  schoolName: string | null;
  roles: string[];
  permissions: Permission[];
}

export type Permission = 
  | 'SCHOOL_DELETE' | 'SCHOOL_UPDATE' | 'SCHOOL_VIEW' | 'SCHOOL_CREATE' | 'SCHOOL_MANAGE' | 'SCHOOLS_VIEW'
  | 'STUDENT_UPDATE' | 'STUDENT_VIEW_ALL' | 'STUDENT_VIEW' | 'STUDENT_DELETE' | 'STUDENT_CREATE' | 'STUDENT_MANAGE'
  | 'STUDENT_BULK_CREATE' | 'STUDENT_BULK_DELETE' | 'STUDENT_VIEW_BY_SCHOOL' | 'STUDENT_VIEW_BY_PARENT'
  | 'STUDENT_VIEW_WALLET_BALANCE' | 'STUDENT_VIEW_WALLET' | 'STUDENT_UPDATE_STATUS' | 'STUDENT_PARENT_REASSIGN'
  | 'USER_VIEW' | 'USER_CREATE' | 'USER_DELETE' | 'USER_UPDATE' | 'USER_INVITE' | 'USERS_VIEW'
  | 'WRISTBAND_VIEW' | 'WRISTBAND_MANAGE' | 'WRISTBAND_ASSIGN' | 'WRISTBAND_DELETE' | 'WRISTBAND_CREATE' | 'WRISTBANDS_VIEW'
  | 'POS_REASSIGN' | 'POS_CREATE' | 'POS_UPDATE' | 'POS_DELETE' | 'POS_MANAGE' | 'POS_VIEW' | 'POS_VIEWS'
  | 'VENDOR_MANAGE' | 'WALLET_MANAGE' | 'PERMISSION_MANAGE' | 'ROLE_MANAGE' | 'PARENT_MANAGE'
  | 'PROFILE_VIEW';

export interface AccessToken {
  token: string;
  tokenType: string;
  createdDate: string;
  expiresOn: string;
}

export interface LoginResponse {
  accessToken: AccessToken;
  refreshToken: string;
  firstTimeLogin: boolean;
  user: User;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  firstTimeLogin: boolean;
}

export interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  email?: string;
  phone?: string;
  schoolId: number;
  schoolName: string;
  parentId?: number;
  parentName?: string;
  wristbandId?: number;
  wristbandSerial?: string;
  status: 'ACTIVE' | 'INACTIVE';
  walletBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  schoolId: number;
  schoolName: string;
  categoryId: number;
  categoryName: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface POSDevice {
  id: number;
  serialNumber: string;
  name: string;
  schoolId?: number;
  schoolName?: string;
  vendorId?: number;
  vendorName?: string;
  status: 'ACTIVE' | 'INACTIVE';
  isAssigned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Wristband {
  id: number;
  serialNumber: string;
  schoolId?: number;
  schoolName?: string;
  studentId?: number;
  studentName?: string;
  status: 'ACTIVE' | 'INACTIVE';
  isAssigned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Parent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: number;
  schoolName: string;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Table Filter Types
export interface TableFilters {
  search?: string;
  status?: string;
  schoolId?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  totalVendors: number;
  totalTransactions: number;
  totalRevenue: number;
  activeWristbands: number;
  activePOSDevices: number;
  monthlyGrowth: number;
}

export interface RecentActivity {
  id: number;
  type: 'TRANSACTION' | 'USER_CREATED' | 'SCHOOL_CREATED' | 'DEVICE_ASSIGNED';
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
}