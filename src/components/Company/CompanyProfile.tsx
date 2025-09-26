import React, { useState } from 'react';
import {
  Building,
  Upload,
  Save,
  Eye,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  Palette,
  Image,
  FileText,
  Settings,
  Check,
  X
} from 'lucide-react';

interface CompanyData {
  // Basic Information
  companyName: string;
  brandName: string;
  tagline: string;
  description: string;
  
  // Contact Information
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  
  // Business Details
  industry: string;
  companyType: string;
  establishedYear: string;
  employeeCount: string;
  annualRevenue: string;
  
  // Financial Settings
  baseCurrency: string;
  financialYearStart: string;
  taxId: string;
  gstNumber: string;
  
  // Branding
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoHeader: File | null;
  logoLogin: File | null;
  favicon: File | null;
  
  // System Settings
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  language: string;
}

const FileUpload: React.FC<{
  label: string;
  description: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept: string;
  preview?: boolean;
}> = ({ label, description, file, onFileChange, accept, preview = true }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onFileChange(selectedFile);
  };

  const handleRemove = () => {
    onFileChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-50">{label}</label>
      <p className="text-xs text-slate-400">{description}</p>
      
      <div className="border-2 border-dashed border-yellow-400/30 rounded-xl p-6 hover:border-yellow-400/50 transition-all backdrop-blur-sm bg-slate-700/20">
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {preview && file.type.startsWith('image/') && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-lg border border-yellow-400/30"
                />
              )}
              <div>
                <p className="text-sm font-medium text-slate-50">{file.name}</p>
                <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300 mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500">PNG, JPG, SVG up to 2MB</p>
          </div>
        )}
        
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (color: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-50">{label}</label>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 rounded-lg border border-yellow-400/30 cursor-pointer bg-transparent"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export const CompanyProfile: React.FC = () => {
  const [formData, setFormData] = useState<CompanyData>({
    // Basic Information
    companyName: 'Ramnirmalchits Financial Services',
    brandName: 'Ramnirmalchits',
    tagline: 'Your Trusted Financial Partner',
    description: 'Leading chit fund and financial services company providing secure investment solutions.',
    
    // Contact Information
    email: 'info@ramnirmalchits.com',
    phone: '+91 98765 43210',
    website: 'https://www.ramnirmalchits.com',
    address: '123 Business District',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    postalCode: '560001',
    
    // Business Details
    industry: 'Financial Services',
    companyType: 'Private Limited',
    establishedYear: '2010',
    employeeCount: '50-100',
    annualRevenue: '10-50 Crores',
    
    // Financial Settings
    baseCurrency: 'INR',
    financialYearStart: 'April',
    taxId: 'AABCR1234F',
    gstNumber: '29AABCR1234F1Z5',
    
    // Branding
    primaryColor: '#3b82f6',
    secondaryColor: '#1e293b',
    accentColor: '#fbbf24',
    logoHeader: null,
    logoLogin: null,
    favicon: null,
    
    // System Settings
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12-hour',
    language: 'English'
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof CompanyData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    // Show success message
  };

  const tabs = [
    { id: 'basic', name: 'Basic Information', icon: Building },
    { id: 'contact', name: 'Contact Details', icon: Mail },
    { id: 'business', name: 'Business Details', icon: CreditCard },
    { id: 'financial', name: 'Financial Settings', icon: Settings },
    { id: 'branding', name: 'Branding & Logo', icon: Palette },
    { id: 'system', name: 'System Settings', icon: Globe }
  ];

  const currencies = [
    { code: 'INR', name: 'Indian Rupee (₹)' },
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' }
  ];

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia'
  ];

  const industries = [
    'Financial Services', 'Banking', 'Insurance', 'Investment', 'Real Estate', 'Technology', 'Healthcare', 'Education'
  ];

  const companyTypes = [
    'Private Limited', 'Public Limited', 'Partnership', 'Sole Proprietorship', 'LLP'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Brand Name *</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange('brandName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="Enter brand name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="Enter company tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="Enter company description"
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="company@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="https://www.company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-50 mb-2">Address *</label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="Postal Code"
                />
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Industry *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Company Type *</label>
                <select
                  value={formData.companyType}
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  {companyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Established Year</label>
                <input
                  type="number"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="2010"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Employee Count</label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-500">101-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Annual Revenue</label>
                <select
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="Under 1 Crore">Under 1 Crore</option>
                  <option value="1-10 Crores">1-10 Crores</option>
                  <option value="10-50 Crores">10-50 Crores</option>
                  <option value="50-100 Crores">50-100 Crores</option>
                  <option value="100+ Crores">100+ Crores</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Base Currency *</label>
                <select
                  value={formData.baseCurrency}
                  onChange={(e) => handleInputChange('baseCurrency', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Financial Year Start</label>
                <select
                  value={formData.financialYearStart}
                  onChange={(e) => handleInputChange('financialYearStart', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="January">January</option>
                  <option value="April">April</option>
                  <option value="July">July</option>
                  <option value="October">October</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Tax ID / PAN</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="AABCR1234F"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">GST Number</label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                  placeholder="29AABCR1234F1Z5"
                />
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-8">
            {/* Color Scheme */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Color Scheme
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ColorPicker
                  label="Primary Color"
                  value={formData.primaryColor}
                  onChange={(color) => handleInputChange('primaryColor', color)}
                />
                <ColorPicker
                  label="Secondary Color"
                  value={formData.secondaryColor}
                  onChange={(color) => handleInputChange('secondaryColor', color)}
                />
                <ColorPicker
                  label="Accent Color"
                  value={formData.accentColor}
                  onChange={(color) => handleInputChange('accentColor', color)}
                />
              </div>
            </div>

            {/* Logo Uploads */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Logo & Branding Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUpload
                  label="Header Logo"
                  description="Used in the main header navigation. Recommended: 200x60px, PNG/SVG"
                  file={formData.logoHeader}
                  onFileChange={(file) => handleFileChange('logoHeader', file)}
                  accept="image/*"
                />
                
                <FileUpload
                  label="Login Page Logo"
                  description="Displayed on login and authentication pages. Recommended: 300x100px, PNG/SVG"
                  file={formData.logoLogin}
                  onFileChange={(file) => handleFileChange('logoLogin', file)}
                  accept="image/*"
                />
                
                <FileUpload
                  label="Favicon"
                  description="Browser tab icon. Recommended: 32x32px, ICO/PNG"
                  file={formData.favicon}
                  onFileChange={(file) => handleFileChange('favicon', file)}
                  accept="image/*,.ico"
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Brand Preview
              </h3>
              <div className="bg-slate-700/30 border border-yellow-400/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl border border-yellow-400/30"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    {formData.brandName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-50">{formData.brandName}</h4>
                    <p className="text-slate-300">{formData.tagline}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div 
                    className="w-8 h-8 rounded-lg border border-yellow-400/30"
                    style={{ backgroundColor: formData.primaryColor }}
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-lg border border-yellow-400/30"
                    style={{ backgroundColor: formData.secondaryColor }}
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-lg border border-yellow-400/30"
                    style={{ backgroundColor: formData.accentColor }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Timezone *</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Date Format</label>
                <select
                  value={formData.dateFormat}
                  onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-50 mb-2">Time Format</label>
                <select
                  value={formData.timeFormat}
                  onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                >
                  <option value="12-hour">12-hour (AM/PM)</option>
                  <option value="24-hour">24-hour</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-yellow-400/30 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Company Profile & Branding</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your company information, branding, and system settings
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-yellow-400/30 bg-slate-800/40 backdrop-blur-xl flex-shrink-0">
          <nav className="flex space-x-4 px-4 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-300'
                  } whitespace-nowrap py-3 px-2 border-b-2 font-medium text-sm flex items-center transition-all`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-800/40 backdrop-blur-xl scrollbar-none">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};