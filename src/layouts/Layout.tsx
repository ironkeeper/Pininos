import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {

    const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar toogleSidebar={()=>setCollapsed(!collapsed)} collapsed={collapsed}  />
        <main className={`flex-1 overflow-y-auto p-10 bg-gray-100  transition-all duration-300 ease-in-out ${
    collapsed ? 'ml-20' : 'ml-64'
  }pt-26`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}