export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'employee' | 'agent' | 'subscriber';
  permissions: string[];
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  department?: string;
  branch?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}