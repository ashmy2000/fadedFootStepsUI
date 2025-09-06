import { create } from 'zustand';
import { AuthState } from '../types';
import { mockUsers } from '../data/mockData';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock authentication
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      set({ user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (name: string, email: string, password: string, role: 'CUSTOMER' | 'ADMIN', inviteCode?: string) => {
    // Validate admin invite code
    if (role === 'ADMIN' && inviteCode !== 'FADED-ADMIN-2025') {
      return false;
    }

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      role,
      name,
      email
    };

    mockUsers.push(newUser);
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));