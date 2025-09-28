export type UserCategory = "Admin" | "Employees" | "Agents" | "Subscribers";

export type UserRow = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category: UserCategory;
  role?: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
  lastLogin?: string;
  department?: string;
  branch?: string;
  joiningDate?: string;
};

export const mockUsers: UserRow[] = [
  // Admin Users
  {
    id: "admin_1",
    name: "Prakashh Admin",
    email: "prakashh@ramnirmalchits.com",
    phone: "+91 98765 43210",
    category: "Admin",
    role: "Super Administrator",
    status: "Active",
    lastLogin: "2024-03-15T14:08:55",
    department: "Executive",
    branch: "Bangalore Main",
    joiningDate: "2020-01-01"
  },
  {
    id: "admin_2",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@ramnirmalchits.com",
    phone: "+91 98765 43213",
    category: "Admin",
    role: "Branch Manager",
    status: "Active",
    lastLogin: "2024-03-15T09:30:00",
    department: "Operations",
    branch: "Bangalore Main",
    joiningDate: "2020-02-15"
  },
  {
    id: "admin_3",
    name: "Amit Patel",
    email: "amit.patel@ramnirmalchits.com",
    phone: "+91 98765 43217",
    category: "Admin",
    role: "Finance Manager",
    status: "Active",
    lastLogin: "2024-03-14T16:20:00",
    department: "Finance & Accounts",
    branch: "Bangalore Main",
    joiningDate: "2020-08-15"
  },
  {
    id: "admin_4",
    name: "Sunita Reddy",
    email: "sunita.reddy@ramnirmalchits.com",
    phone: "+91 98765 43219",
    category: "Admin",
    role: "HR Manager",
    status: "Active",
    lastLogin: "2024-03-13T11:45:00",
    department: "Human Resources",
    branch: "Bangalore Main",
    joiningDate: "2021-01-10"
  },

  // Employee Users
  {
    id: "emp_1",
    name: "Priya Sharma",
    email: "priya.sharma@ramnirmalchits.com",
    phone: "+91 98765 43215",
    category: "Employees",
    role: "Sales Executive",
    status: "Active",
    lastLogin: "2024-03-14T16:45:00",
    department: "Sales & Marketing",
    branch: "Bangalore Main",
    joiningDate: "2021-06-01"
  },
  {
    id: "emp_2",
    name: "Karthik Nair",
    email: "karthik.nair@ramnirmalchits.com",
    phone: "+91 98765 43221",
    category: "Employees",
    role: "Accountant",
    status: "Active",
    lastLogin: "2024-03-12T14:30:00",
    department: "Finance & Accounts",
    branch: "Bangalore Main",
    joiningDate: "2022-03-01"
  },
  {
    id: "emp_3",
    name: "Neha Singh",
    email: "neha.singh@ramnirmalchits.com",
    phone: "+91 98765 43222",
    category: "Employees",
    role: "Customer Service Executive",
    status: "Active",
    lastLogin: "2024-03-13T10:15:00",
    department: "Customer Service",
    branch: "Chennai Branch",
    joiningDate: "2022-08-20"
  },
  {
    id: "emp_4",
    name: "Rohit Gupta",
    email: "rohit.gupta@ramnirmalchits.com",
    phone: "+91 98765 43223",
    category: "Employees",
    role: "Operations Executive",
    status: "Inactive",
    lastLogin: "2024-02-28T17:30:00",
    department: "Operations",
    branch: "Hyderabad Branch",
    joiningDate: "2021-11-15"
  },

  // Agent Users
  {
    id: "agent_1",
    name: "Vikram Singh",
    email: "vikram.singh@agents.ramnirmalchits.com",
    phone: "+91 98765 43221",
    category: "Agents",
    role: "Senior Sales Agent",
    status: "Active",
    lastLogin: "2024-03-15T08:45:00",
    department: "Sales & Marketing",
    branch: "Bangalore East",
    joiningDate: "2020-11-20"
  },
  {
    id: "agent_2",
    name: "Priya Reddy",
    email: "priya.reddy@agents.ramnirmalchits.com",
    phone: "+91 98765 43225",
    category: "Agents",
    role: "Sales Agent",
    status: "Active",
    lastLogin: "2024-03-14T19:15:00",
    department: "Sales & Marketing",
    branch: "Bangalore East",
    joiningDate: "2022-01-15"
  },
  {
    id: "agent_3",
    name: "Suresh Kumar",
    email: "suresh.kumar@agents.ramnirmalchits.com",
    phone: "+91 98765 43227",
    category: "Agents",
    role: "Field Sales Agent",
    status: "Active",
    lastLogin: "2024-03-13T17:20:00",
    department: "Sales & Marketing",
    branch: "Bangalore West",
    joiningDate: "2019-08-05"
  },
  {
    id: "agent_4",
    name: "Anjali Sharma",
    email: "anjali.sharma@agents.ramnirmalchits.com",
    phone: "+91 98765 43229",
    category: "Agents",
    role: "Junior Sales Agent",
    status: "Active",
    lastLogin: "2024-03-15T12:30:00",
    department: "Sales & Marketing",
    branch: "Bangalore Central",
    joiningDate: "2023-06-01"
  },

  // Subscriber Users
  {
    id: "sub_1",
    name: "Anita Desai",
    email: "anita.desai@subscribers.ramnirmalchits.com",
    phone: "+91 98765 43219",
    category: "Subscribers",
    role: "Premium Subscriber",
    status: "Active",
    lastLogin: "2024-03-13T10:45:00",
    department: "Customer",
    branch: "Bangalore Main",
    joiningDate: "2022-06-15"
  },
  {
    id: "sub_2",
    name: "Deepika Rao",
    email: "deepika.rao@subscribers.ramnirmalchits.com",
    phone: "+91 98765 43223",
    category: "Subscribers",
    role: "Gold Subscriber",
    status: "Active",
    lastLogin: "2024-03-11T14:30:00",
    department: "Customer",
    branch: "Bangalore East",
    joiningDate: "2021-09-12"
  },
  {
    id: "sub_3",
    name: "Ravi Patel",
    email: "ravi.patel@subscribers.ramnirmalchits.com",
    phone: "+91 98765 43225",
    category: "Subscribers",
    role: "Silver Subscriber",
    status: "Active",
    lastLogin: "2024-03-10T16:20:00",
    department: "Customer",
    branch: "Bangalore Main",
    joiningDate: "2023-01-20"
  },
  {
    id: "sub_4",
    name: "Meera Nair",
    email: "meera.nair@subscribers.ramnirmalchits.com",
    phone: "+91 98765 43227",
    category: "Subscribers",
    role: "Basic Subscriber",
    status: "Inactive",
    lastLogin: "2024-02-20T11:30:00",
    department: "Customer",
    branch: "Bangalore South",
    joiningDate: "2023-08-10"
  }
];

export const getUsersByCategory = (category: UserCategory): UserRow[] => {
  return mockUsers.filter(user => user.category === category);
};

export const getAllUsers = (): UserRow[] => {
  return mockUsers;
};

export const getUserById = (id: string): UserRow | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const searchUsers = (query: string, category?: UserCategory): UserRow[] => {
  let users = category ? getUsersByCategory(category) : getAllUsers();
  
  if (!query.trim()) return users;
  
  const searchTerm = query.toLowerCase();
  return users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.email?.toLowerCase().includes(searchTerm) ||
    user.phone?.includes(searchTerm) ||
    user.role?.toLowerCase().includes(searchTerm)
  );
};