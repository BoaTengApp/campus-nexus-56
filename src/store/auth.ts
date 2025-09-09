import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, Permission } from '@/lib/types';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setFirstTimeLogin: (firstTime: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  clearAuth: () => void;
  
  // Permission helpers
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  
  // User type helpers
  isSuperAdmin: () => boolean;
  isSchoolAdmin: () => boolean;
  isTeacher: () => boolean;
  isHousemaster: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      firstTimeLogin: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      setFirstTimeLogin: (firstTime) =>
        set({ firstTimeLogin: firstTime }),

      setLoading: (loading) =>
        set({ isLoading: loading }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          firstTimeLogin: false,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          firstTimeLogin: false,
          isLoading: false,
        });
      },

      // Permission helpers
      hasPermission: (permission) => {
        const { user } = get();
        return user?.permissions?.includes(permission) ?? false;
      },

      hasAnyPermission: (permissions) => {
        const { user } = get();
        if (!user?.permissions) return false;
        return permissions.some((permission) =>
          user.permissions.includes(permission)
        );
      },

      hasAllPermissions: (permissions) => {
        const { user } = get();
        if (!user?.permissions) return false;
        return permissions.every((permission) =>
          user.permissions.includes(permission)
        );
      },

      // User type helpers
      isSuperAdmin: () => {
        const { user } = get();
        return user?.userType === 'SUPER_ADMIN';
      },

      isSchoolAdmin: () => {
        const { user } = get();
        return user?.userType === 'SCHOOL_ADMIN';
      },

      isTeacher: () => {
        const { user } = get();
        return user?.userType === 'TEACHER';
      },

      isHousemaster: () => {
        const { user } = get();
        return user?.userType === 'HOUSEMASTER';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        firstTimeLogin: state.firstTimeLogin,
      }),
    }
  )
);