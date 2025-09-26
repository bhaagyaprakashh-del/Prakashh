// HRMS Core Types
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  
  // Personal Information
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  bloodGroup?: string;
  
  // Address Information
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Professional Information
  designation: string;
  department: string;
  branch: string;
  joiningDate: string;
  confirmationDate?: string;
  probationPeriod: number; // in months
  employmentType: 'permanent' | 'contract' | 'intern' | 'consultant';
  workLocation: 'office' | 'remote' | 'hybrid';
  
  // Reporting Structure
  reportingManager?: string;
  teamMembers: string[];
  
  // Compensation
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    special: number;
  };
  deductions: {
    pf: number;
    esi: number;
    tax: number;
    other: number;
  };
  
  // Bank Details
  bankAccount: {
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    accountHolderName: string;
  };
  
  // Documents
  documents: {
    resume?: string;
    idProof?: string;
    addressProof?: string;
    educationCertificates?: string[];
    experienceCertificates?: string[];
    photo?: string;
  };
  
  // Skills and Qualifications
  skills: string[];
  qualifications: {
    degree: string;
    institution: string;
    year: string;
    percentage?: number;
  }[];
  experience: {
    company: string;
    designation: string;
    duration: string;
    responsibilities: string;
  }[];
  
  // System Information
  status: 'active' | 'inactive' | 'terminated' | 'on-leave';
  userId?: string;
  lastWorkingDay?: string;
  terminationReason?: string;
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    address?: string;
  };
  
  // Metadata
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  notes: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  breakTime: number; // in minutes
  workHours: number;
  overtimeHours: number;
  status: 'present' | 'absent' | 'half-day' | 'on-leave' | 'holiday';
  attendanceType: 'regular' | 'overtime' | 'night-shift' | 'weekend';
  location?: string;
  ipAddress?: string;
  deviceInfo?: string;
  
  // QR Code Attendance
  qrCodeUsed: boolean;
  kioskId?: string;
  
  // Approval Workflow
  approvalStatus: 'auto-approved' | 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  
  // Regularization
  isRegularized: boolean;
  regularizationReason?: string;
  regularizedBy?: string;
  regularizedAt?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'casual' | 'sick' | 'earned' | 'maternity' | 'paternity' | 'emergency';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  attachments?: string[];
  isHalfDay: boolean;
  halfDaySession?: 'morning' | 'afternoon';
}

export interface PayrollRun {
  id: string;
  runName: string;
  payPeriod: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'processing' | 'completed' | 'cancelled';
  totalEmployees: number;
  processedEmployees: number;
  totalGrossPay: number;
  totalDeductions: number;
  totalNetPay: number;
  createdBy: string;
  createdAt: string;
  processedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  payslips: Payslip[];
}

export interface Payslip {
  id: string;
  payrollRunId: string;
  employeeId: string;
  payPeriod: string;
  
  // Earnings
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    special: number;
    overtime: number;
  };
  grossPay: number;
  
  // Deductions
  deductions: {
    pf: number;
    esi: number;
    tax: number;
    advance: number;
    other: number;
  };
  totalDeductions: number;
  
  // Final Calculation
  netPay: number;
  
  // Attendance Summary
  workingDays: number;
  presentDays: number;
  absentDays: number;
  leavesTaken: number;
  overtimeHours: number;
  
  // Status
  status: 'generated' | 'sent' | 'acknowledged';
  generatedAt: string;
  sentAt?: string;
  acknowledgedAt?: string;
  
  // File
  pdfUrl?: string;
}

export interface AttendanceKiosk {
  id: string;
  name: string;
  location: string;
  branch: string;
  qrCode: string;
  ipAddress: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastHeartbeat: string;
  totalScans: number;
  createdAt: string;
}