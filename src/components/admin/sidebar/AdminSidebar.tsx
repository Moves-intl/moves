import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, ChevronDown, ChevronUp, ChevronsLeft, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems, MenuItem } from '../config/menuItems';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const AdminSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // State for collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const getUserRole = async () => {
      if (!user) return;
      try {
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        setUserRole(userProfile?.role || null);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    getUserRole();
  }, [user]);

  const toggleSubMenu = (name: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSubMenu(name);
    } else {
      setOpenSubMenu(openSubMenu === name ? null : name);
    }
  };

  const hasAccess = (item: MenuItem) => {
    if (!item.requiredRoles) return true;
    return userRole && item.requiredRoles.includes(userRole);
  };

  return (
    <div 
      className={`flex-shrink-0 bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-4 bg-gradient-to-r from-primary to-primary/90 text-white overflow-hidden">
        
        {/* Logo Content - Hides when collapsed */}
        <div className={`flex items-center space-x-3 transition-opacity duration-200 ${isCollapsed ? 'hidden' : 'block'}`}>
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div className="whitespace-nowrap">
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-xs text-white/80">Moves International</p>
          </div>
        </div>

        {/* Toggle Button - Centered if collapsed, on right if expanded */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-white/20 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <Menu className="w-6 h-6" /> : <ChevronsLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)] overflow-x-hidden">
        {menuItems.filter(hasAccess).map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <Button
                  variant="ghost"
                  className={`w-full font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-all duration-200 h-11 rounded-lg px-3 ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  }`}
                  onClick={() => toggleSubMenu(item.name)}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.name}</span>
                      {openSubMenu === item.name ? 
                        <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : 
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      }
                    </>
                  )}
                </Button>
                
                {/* Only show submenu if sidebar is expanded */}
                {!isCollapsed && openSubMenu === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={`flex items-center p-2 rounded-md text-sm transition-all duration-200 ${
                          location.pathname === subItem.href 
                            ? 'bg-primary text-white shadow-sm' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        <div className="w-2 h-2 bg-current rounded-full mr-3 opacity-60 flex-shrink-0"></div>
                        <span className="truncate">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.href}
                className={`flex items-center h-11 rounded-lg font-medium transition-all duration-200 px-3 ${
                  location.pathname === item.href 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;