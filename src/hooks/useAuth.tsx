import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, AuthState, LoginCredentials } from '../types/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin user
const defaultAdminUser: User = {
  id: '1',
  username: 'prakash',
  email: 'prakashh@ramnirmalchits.com',
  firstName: 'Prakashh',
  lastName: 'Admin',
  role: 'admin',
  permissions: ['*'], // All permissions
  status: 'active',
  createdAt: '2020-01-01',
  phone: '+91 98765 43210',
  department: 'Executive',
  branch: 'Bangalore Main'
};

// Mock user database
const users: (User & { password: string })[] = [
  {
    ...defaultAdminUser,
    password: 'Prakashh@55'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth_state');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        setAuthState(parsedAuth);
      } catch (error) {
        console.error('Failed to parse saved auth state:', error);
        localStorage.removeItem('auth_state');
      }
    }
    setIsLoading(false);
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      localStorage.setItem('auth_state', JSON.stringify(authState));
    } else {
      localStorage.removeItem('auth_state');
    }
  }, [authState]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const user = users.find(
        u => u.username.toLowerCase() === credentials.username.toLowerCase() && 
             u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        const updatedUser = {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString()
        };

        setAuthState({
          isAuthenticated: true,
          user: updatedUser,
          token: 'mock_jwt_token_' + Date.now()
        });

        toast.success(`Welcome back, ${updatedUser.firstName}!`);
        return true;
      } else {
        toast.error('Invalid username or password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null
    });
    localStorage.removeItem('auth_state');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};