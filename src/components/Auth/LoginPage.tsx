import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CompanyBranding {
  companyName: string;
  brandName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoLogin: string | null;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branding, setBranding] = useState<CompanyBranding>({
    companyName: 'Ramnirmalchits Financial Services',
    brandName: 'Ramnirmalchits',
    tagline: 'Your Trusted Financial Partner',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e293b',
    accentColor: '#fbbf24',
    logoLogin: null
  });

  // Load company branding from localStorage
  useEffect(() => {
    const savedBranding = localStorage.getItem('company_branding');
    if (savedBranding) {
      try {
        const brandingData = JSON.parse(savedBranding);
        setBranding(prev => ({ ...prev, ...brandingData }));
      } catch (error) {
        console.error('Failed to load branding:', error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-8">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              {branding.logoLogin ? (
                <img
                  src={branding.logoLogin}
                  alt={branding.brandName}
                  className="h-20 w-auto"
                />
              ) : (
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl border-2 shadow-lg"
                  style={{ 
                    backgroundColor: branding.primaryColor,
                    borderColor: branding.accentColor 
                  }}
                >
                  {branding.brandName.charAt(0)}
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-50 leading-tight">
                {branding.brandName}
              </h1>
              <p 
                className="text-xl lg:text-2xl font-medium"
                style={{ color: branding.accentColor }}
              >
                {branding.tagline}
              </p>
              <p className="text-slate-400 text-lg max-w-md mx-auto lg:mx-0">
                Secure, reliable, and comprehensive business management platform for modern financial services.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 text-slate-300">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${branding.primaryColor}20` }}
                >
                  <Lock className="h-4 w-4" style={{ color: branding.primaryColor }} />
                </div>
                <span>Secure Access</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${branding.primaryColor}20` }}
                >
                  <User className="h-4 w-4" style={{ color: branding.primaryColor }} />
                </div>
                <span>Role-based</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Modal */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Transparent Modal */}
              <div className="bg-slate-800/40 backdrop-blur-xl border border-yellow-400/30 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-50 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all backdrop-blur-sm"
                        placeholder="Enter your username"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-50 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all backdrop-blur-sm"
                        placeholder="Enter your password"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Demo Credentials */}
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-400 text-sm font-medium mb-1">Demo Credentials:</p>
                    <p className="text-blue-300 text-sm">Username: <span className="font-mono">Prakash</span></p>
                    <p className="text-blue-300 text-sm">Password: <span className="font-mono">Prakashh@55</span></p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: branding.primaryColor,
                      ':hover': { backgroundColor: branding.secondaryColor }
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-slate-500 text-sm">
                    © 2024 {branding.companyName}. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};