import { routes } from '../config/routes.tsx';
import { navigation } from '../config/navigation';

export interface RouteAuditResult {
  total: number;
  valid: number;
  missing: number;
  missingRoutes: string[];
  sidebarMismatches: string[];
}

export const auditRoutes = (): RouteAuditResult => {
  console.group('🔍 Route Audit');
  
  const missingRoutes: string[] = [];
  const validRoutes: string[] = [];
  const sidebarMismatches: string[] = [];
  
  // Check all routes have valid components
  routes.forEach(route => {
    try {
      if (route.element) {
        validRoutes.push(`✅ ${route.path} → ${route.title}`);
      } else {
        missingRoutes.push(`❌ ${route.path} → Missing component`);
      }
    } catch (error) {
      missingRoutes.push(`⚠️ ${route.path} → Component error: ${error}`);
    }
  });

  // Check sidebar navigation matches routes
  const checkSidebarItem = (item: any, prefix = '') => {
    const fullPath = `/${item.id}`;
    const route = routes.find(r => r.path === fullPath);
    
    if (!route) {
      sidebarMismatches.push(`🔗 Sidebar item "${item.name}" (${fullPath}) has no matching route`);
    }
    
    if (item.children) {
      item.children.forEach((child: any) => checkSidebarItem(child, prefix));
    }
  };

  navigation.forEach(item => checkSidebarItem(item));

  console.log('📊 Route Audit Results:');
  console.log(`Total Routes: ${routes.length}`);
  console.log(`Valid Routes: ${validRoutes.length}`);
  console.log(`Missing Routes: ${missingRoutes.length}`);
  console.log(`Sidebar Mismatches: ${sidebarMismatches.length}`);
  
  if (validRoutes.length > 0) {
    console.log('\n✅ Valid Routes:');
    validRoutes.forEach(route => console.log(route));
  }
  
  if (missingRoutes.length > 0) {
    console.log('\n❌ Missing/Error Routes:');
    missingRoutes.forEach(route => console.log(route));
  }
  
  if (sidebarMismatches.length > 0) {
    console.log('\n🔗 Sidebar Mismatches:');
    sidebarMismatches.forEach(mismatch => console.log(mismatch));
  }
  
  console.groupEnd();
  
  return {
    total: routes.length,
    valid: validRoutes.length,
    missing: missingRoutes.length,
    missingRoutes,
    sidebarMismatches
  };
};

// Development route debugging component
export const RouteDebugger: React.FC = () => {
  const auditResult = auditRoutes();
  
  return (
    <div className="p-6 bg-slate-800 text-white">
      <h1 className="text-2xl font-bold mb-4">Route Audit Results</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 p-4 rounded">
          <h3 className="font-semibold">Total Routes</h3>
          <p className="text-2xl">{auditResult.total}</p>
        </div>
        <div className="bg-green-600 p-4 rounded">
          <h3 className="font-semibold">Valid Routes</h3>
          <p className="text-2xl">{auditResult.valid}</p>
        </div>
        <div className="bg-red-600 p-4 rounded">
          <h3 className="font-semibold">Missing Routes</h3>
          <p className="text-2xl">{auditResult.missing}</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded">
          <h3 className="font-semibold">Sidebar Issues</h3>
          <p className="text-2xl">{auditResult.sidebarMismatches.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Routes</h2>
          <div className="space-y-2">
            {routes.map(route => (
              <div key={route.key} className="flex items-center justify-between p-2 bg-slate-700 rounded">
                <span>{route.path} → {route.title}</span>
                <button 
                  onClick={() => window.location.href = route.path}
                  className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};