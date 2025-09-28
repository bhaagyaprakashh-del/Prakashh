@@ .. @@
 export interface AppConfig {
   theme: ThemeConfig;
   sidebar: SidebarConfig;
   modules: ModuleConfig[];
   forms: Record<string, FormSchema>;
   tables: Record<string, TableSchema>;
+  company: CompanyConfig;
 }

 export interface ThemeConfig {
@@ .. @@
   visible: boolean;
 }

+export interface CompanyConfig {
+  companyName: string;
+  brandName: string;
+  logoSidebar?: string;
+  logoLogin?: string;
+  logoHeader?: string;
+  favicon?: string;
+  primaryColor: string;
+  secondaryColor: string;
+  website?: string;
+  email?: string;
+  phone?: string;
+  address?: string;
+}
+
 export interface ModuleConfig {
@@ .. @@
     modules: [],
     forms: {},
-    tables: {}
+    tables: {},
+    company: {
+      companyName: 'Ramnirmalchits CRM',
+      brandName: 'Ramnirmalchits',
+      primaryColor: '#3b82f6',
+      secondaryColor: '#1e293b'
+    }
   };