import { notFound } from "next/navigation";
import { ALL_CLOUD_IDS, CLOUD_THEMES } from "@/lib/cloudTheme";

export default function CloudGalleryPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Cloud Theme Gallery</h1>
      <p className="text-gray-600 mb-8">
        Visual regression check for all cloud themes. Each card should show correct gradients.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_CLOUD_IDS.map((cloudId) => {
          const theme = CLOUD_THEMES[cloudId];
          const Icon = theme.icon;
          
          return (
            <div key={cloudId} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-br ${theme.heroBg} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium opacity-90">Hero Gradient</span>
                </div>
                <h2 className="text-xl font-bold">{cloudId}</h2>
                <p className="text-sm opacity-80 mt-1">heroBg: {theme.heroBg}</p>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Recent Files Gradient:</p>
                  <div className={`bg-gradient-to-br ${theme.recentFilesBg} h-12 rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-medium">
                      {theme.recentFilesBg}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Prompt Bar Background:</p>
                  <div className={`${theme.promptBarBg} h-12 rounded-lg flex items-center justify-center bg-gray-800`}>
                    <span className="text-white text-xs font-medium">
                      {theme.promptBarBg}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-2">Tabs ({theme.tabs.length}):</p>
                  <div className="flex flex-wrap gap-1">
                    {theme.tabs.map((tab) => (
                      <span
                        key={tab.id}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {tab.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Validation Checklist:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>✓ All {ALL_CLOUD_IDS.length} clouds should display colored gradients (no blank/white)</li>
          <li>✓ Hero and Recent Files should use matching color schemes</li>
          <li>✓ Each cloud should have at least one tab</li>
          <li>✓ Icons should render (no missing/broken icons)</li>
        </ul>
      </div>
    </div>
  );
}
