import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppRole = "Admin" | "Employee" | "Agent" | "Subscriber";

interface User {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  permissions: string[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    if (username === 'Prakash' && password === 'Prakashh@55') {
      const userData: User = {
        id: '1',
        name: 'Prakash',
        email: 'prakash@ramnirmalchits.com',
          role: 'Admin',
        permissions: ['all']
      };
      
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } else if (username === 'employee' && password === 'employee') {
        const user: User = {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya.sharma@ramnirmalchits.com',
          role: 'Employee',
          permissions: ['tasks', 'reports', 'calendar'],
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else if (username === 'agent' && password === 'agent') {
        const user: User = {
          id: '3',
          name: 'Vikram Singh',
          email: 'vikram.singh@agents.ramnirmalchits.com',
          role: 'Agent',
          permissions: ['leads', 'meetings', 'calls', 'visits'],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      } else if (username === 'subscriber' && password === 'subscriber') {
        const user: User = {
          id: '4',
          name: 'Anita Desai',
          email: 'anita.desai@subscribers.ramnirmalchits.com',
          role: 'Subscriber',
          permissions: ['profile', 'chits', 'payments', 'support'],
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      };
      
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};